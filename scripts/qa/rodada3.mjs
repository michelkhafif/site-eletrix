// Testes de ponta a ponta da rodada 3 contra o site estático servido localmente.
// Uso: node scripts/qa/serve.mjs 3001  (em outro terminal)  e  node scripts/qa/rodada3.mjs [base-url]
// Nada é enviado para fora: WhatsApp, Coderbox, Estadão e FormSubmit são interceptados.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '');
const pages = Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/pages.json'), 'utf8')));
const CODERBOX = 'https://coderbox.com.br/redirect/?empresa=eletrix';
const SUPPORT_WA = 'https://wa.me/5511919552120?text=Ol%C3%A1!%20Preciso%20de%20suporte%20em%20uma%20esta%C3%A7%C3%A3o%20Eletrix.';

let fails = 0, passes = 0;
const ok = (c, msg) => { console.log(c ? 'ok   ' : 'FALHA', msg); if (c) passes++; else fails++; };
const section = (t) => console.log(`\n== ${t}`);
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge' });
const errors = new Set();

async function open(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', ...opts });
  const sent = [];
  let formMode = 'ok';
  await ctx.route(/^https:\/\/(wa\.me|coderbox\.com\.br|mobilidade\.estadao\.com\.br|apps\.apple\.com|play\.google\.com|www\.instagram\.com)\//, (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<p>interceptado</p>' }));
  await ctx.route('https://formsubmit.co/**', async (r) => {
    sent.push(r.request().postDataJSON());
    if (formMode === 'error') return r.fulfill({ status: 500, contentType: 'application/json', body: '{"success":"false"}' });
    if (formMode === 'inactive') return r.fulfill({ status: 200, contentType: 'application/json', body: '{"success":"false","message":"This form needs Activation."}' });
    return r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: '{"success":"true"}' });
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.add(`${page.url()} ${String(e).slice(0, 160)}`));
  page.on('console', (m) => m.type() === 'error' && !/status of (404|500)/.test(m.text()) && errors.add(`${page.url()} ${m.text().slice(0, 160)}`));
  return { ctx, page, sent, setForm: (m) => { formMode = m; } };
}
const go = async (page, p) => { await page.goto(base + p, { waitUntil: 'networkidle' }); await page.waitForTimeout(250); };
const sectionTop = (page, id) => page.evaluate((i) => Math.round(document.getElementById(i).getBoundingClientRect().top), id);
const settle = (page) => page.waitForTimeout(1300);
const formState = (page) => page.evaluate(() => ({ url: location.pathname + location.search, perfil: document.querySelector('form input[name=perfil]:checked')?.value, interesse: document.querySelector('form select[name=interesse]')?.value }));

/* ---------------------------------------------------------------- HEADER (desktop) */
section('Header no desktop');
{
  const { ctx, page } = await open({ reducedMotion: 'no-preference' });
  await go(page, '/');
  const items = await page.locator('header nav[aria-label=Principal] > a, header nav[aria-label=Principal] > div > button').allTextContents();
  ok(items.map((s) => s.trim()).join(' · ') === 'Home · Soluções · App · Estações · Parceiros · Sobre', `ordem do menu: ${items.join(' · ')}`);
  const nav = page.locator('header nav[aria-label=Principal]');
  await nav.getByRole('link', { name: 'App', exact: true }).click(); await settle(page);
  const appTop = await sectionTop(page, 'app'), appTitle = await page.evaluate(() => Math.round(document.getElementById('app-t').getBoundingClientRect().top));
  ok(Math.abs(appTop - 88) < 40 && appTitle < 900 && (await page.evaluate(() => location.hash)) === '#app', `"App" rola até a seção do app (âncora em ${appTop}px, título em ${appTitle}px)`);
  await nav.getByRole('link', { name: 'Estações' }).click(); await settle(page);
  const est = await sectionTop(page, 'estacoes');
  ok(Math.abs(est) < 100, `"Estações" rola até a seção (topo em ${est}px)`);
  await nav.getByRole('link', { name: 'Home' }).click(); await settle(page);
  ok((await page.evaluate(() => window.scrollY)) < 5, '"Home" volta ao topo');
  await nav.getByRole('link', { name: 'Parceiros' }).click(); await page.waitForURL('**/parceiros/'); ok(true, '"Parceiros" abre /parceiros/');
  await nav.getByRole('link', { name: 'App', exact: true }).click(); await page.waitForURL('**/#app'); await settle(page);
  ok(Math.abs((await sectionTop(page, 'app')) - 88) < 40, 'de outra página, "App" chega em /#app já na seção');
  await go(page, '/sobre/');
  await nav.getByRole('link', { name: 'Estações' }).click(); await page.waitForURL('**/#estacoes'); await settle(page);
  ok(Math.abs(await sectionTop(page, 'estacoes')) < 100, 'de outra página, "Estações" chega na seção');
  await go(page, '/');
  const dl = page.locator('header').getByRole('link', { name: 'Baixe o App' });
  ok((await dl.getAttribute('href')) === CODERBOX && (await dl.getAttribute('target')) === '_blank' && /noopener/.test(await dl.getAttribute('rel')), '"Baixe o App" aponta para a Coderbox, em nova aba, com noopener');
  const [tab] = await Promise.all([ctx.waitForEvent('page'), dl.click()]);
  await tab.waitForLoadState(); ok(tab.url() === CODERBOX && page.url() === `${base}/`, `clique abre a Coderbox em outra aba (${tab.url()}), sem tela intermediária`); await tab.close();
  const downloads = await page.evaluate(() => [...document.querySelectorAll('a')].filter((a) => a.textContent.trim() === 'Baixe o App').map((a) => a.href));
  ok(downloads.length >= 2 && downloads.every((h) => h === CODERBOX), `todos os botões "Baixe o App" usam a Coderbox (${downloads.length})`);
  await page.getByRole('button', { name: 'Soluções' }).click(); ok(await page.locator('#mega-solucoes').isVisible(), 'mega menu abre'); await page.keyboard.press('Escape'); ok(!(await page.locator('#mega-solucoes').isVisible()), 'mega menu fecha com Esc');
  await page.locator('header').getByRole('link', { name: 'Fale com a Eletrix' }).click(); await page.waitForURL('**/contato/**'); ok(true, '"Fale com a Eletrix" abre /contato/');
  await go(page, '/adequacao-it-41/'); await page.locator('header').getByRole('link', { name: 'Fale com a Eletrix' }).click(); await page.waitForURL('**/contato/**'); await page.waitForTimeout(400);
  const c = await formState(page); ok(c.interesse === 'adequacao-it-41' && c.perfil === 'sindico', `"Fale com a Eletrix" na página da IT-41 chega pré-selecionado (${c.perfil}, ${c.interesse})`);
  await ctx.close();
}

/* ---------------------------------------------------------------- HEADER: larguras apertadas */
section('Header entre 1024 e 1920 px');
for (const w of [1024, 1152, 1280, 1440, 1920]) {
  const { ctx, page } = await open({ viewport: { width: w, height: 800 } });
  await go(page, '/');
  const r = await page.evaluate(() => {
    const els = [...document.querySelectorAll('header a, header button')].filter((e) => e.getClientRects().length && e.getBoundingClientRect().width > 1 && !e.closest('#mega-solucoes'));
    const rects = els.map((e) => e.getBoundingClientRect()).sort((a, b) => a.left - b.left);
    return { overlap: rects.slice(1).some((x, i) => x.left < rects[i].right - 0.5), tall: rects.some((x) => x.height > 48), right: Math.max(...rects.map((x) => x.right)), sw: document.documentElement.scrollWidth };
  });
  ok(!r.overlap && !r.tall && r.right <= w - 16 && r.sw <= w, `${w}px: nada encosta, quebra linha ou vaza (último item termina em ${Math.round(r.right)})`);
  await ctx.close();
}

/* ---------------------------------------------------------------- MENU MOBILE */
section('Menu do celular');
for (const [w, h] of [[390, 844], [360, 640], [844, 390]]) {
  const { ctx, page } = await open({ viewport: { width: w, height: h }, hasTouch: true });
  await go(page, '/');
  await page.getByRole('button', { name: 'Abrir menu' }).click(); await page.waitForTimeout(200);
  const texts = await page.evaluate(() => [...document.querySelectorAll('#menu-mobile a, #menu-mobile button')].map((e) => e.textContent.trim()));
  ok(['Home', 'Soluções', 'App', 'Estações', 'Parceiros', 'Sobre', 'Baixe o App', 'Suporte', 'Fale com a Eletrix'].every((t) => texts.includes(t)), `${w}x${h}: todos os itens no menu`);
  const dl = await page.locator('#menu-mobile a', { hasText: 'Baixe o App' });
  await dl.scrollIntoViewIfNeeded();
  ok((await dl.getAttribute('href')) === CODERBOX && (await dl.isVisible()), `${w}x${h}: "Baixe o App" visível e com o link certo`);
  ok(await page.locator('.wa-float').evaluate((e) => getComputedStyle(e).visibility === 'hidden'), `${w}x${h}: botão do WhatsApp sai da frente do menu`);
  await page.locator('#menu-mobile a', { hasText: /^App$/ }).click(); await page.waitForTimeout(900);
  ok((await page.locator('#menu-mobile').count()) === 0 && Math.abs((await sectionTop(page, 'app')) - 88) < 60 && (await page.evaluate(() => document.body.style.overflow)) === '', `${w}x${h}: "App" fecha o menu, libera a rolagem e chega na seção`);
  await page.getByRole('button', { name: 'Abrir menu' }).click(); await page.keyboard.press('Escape');
  ok((await page.locator('#menu-mobile').count()) === 0, `${w}x${h}: fecha com Esc`);
  await ctx.close();
}

/* ---------------------------------------------------------------- POPUP DE SUPORTE */
section('Popup de suporte');
for (const [w, h, touch] of [[1440, 900, false], [390, 844, true], [360, 640, true]]) {
  const { ctx, page } = await open({ viewport: { width: w, height: h }, hasTouch: touch });
  await go(page, '/');
  const trigger = touch ? page.locator('#menu-mobile a[href$="/suporte/"]') : page.locator('header a[href$="/suporte/"]');
  const openIt = async () => { if (touch) await page.getByRole('button', { name: 'Abrir menu' }).click(); await trigger.click(); await page.waitForTimeout(350); };
  const isOpen = () => page.evaluate(() => document.querySelector('#suporte-popup').open);
  await openIt();
  const d = await page.evaluate(() => { const el = document.querySelector('#suporte-popup'); const r = el.getBoundingClientRect(); return { open: el.open, modal: el.getAttribute('aria-modal'), role: el.tagName, label: document.getElementById(el.getAttribute('aria-labelledby')).textContent, links: [...el.querySelectorAll('a')].map((a) => a.getAttribute('href')), text: el.textContent, lock: document.documentElement.style.overflow, bottom: Math.round(innerHeight - r.bottom), width: Math.round(r.width), fits: r.top >= 0 && el.scrollHeight <= el.clientHeight + 1, focusInside: el.contains(document.activeElement), url: location.pathname }; });
  ok(d.open && d.url === '/' && d.role === 'DIALOG' && d.modal === 'true' && d.label === 'Suporte Eletrix', `${w}: abre na própria página como diálogo modal`);
  ok(d.links.includes('tel:08004441044') && d.links.includes(SUPPORT_WA), `${w}: links do 0800 e do WhatsApp corretos`);
  ok(/0800 444 1044/.test(d.text) && /24 horas, todos os dias/.test(d.text) && /Das 8h às 20h/.test(d.text) && /\+55 11 91955-2120/.test(d.text), `${w}: números e horários`);
  ok(d.lock === 'hidden' && d.focusInside, `${w}: fundo travado e foco dentro`);
  if (touch) ok(d.bottom <= 1 && d.width >= w - 1, `${w}: abre como folha de baixo para cima (colada embaixo, largura total)`);
  ok(d.fits, `${w}: cabe na tela sem rolar`);
  const seen = [];
  for (let i = 0; i < 9; i++) { await page.keyboard.press('Tab'); seen.push(await page.evaluate(() => !!document.activeElement.closest('#suporte-popup'))); }
  ok(seen.every(Boolean), `${w}: Tab não sai do popup`);
  await page.getByRole('button', { name: 'Fechar', exact: true }).click(); await page.waitForTimeout(200);
  const focusBack = () => page.evaluate(() => document.activeElement.getAttribute('aria-label') || document.activeElement.textContent.trim());
  const back1 = await focusBack();
  ok(!(await isOpen()) && /Suporte|Abrir menu/.test(back1) && (await page.evaluate(() => document.documentElement.style.overflow)) === '', `${w}: fecha no X, libera a rolagem e devolve o foco ("${back1}")`);
  await openIt(); await page.keyboard.press('Escape'); await page.waitForTimeout(200);
  ok(!(await isOpen()) && /Suporte|Abrir menu/.test(await focusBack()), `${w}: fecha com Esc e devolve o foco`);
  await openIt(); await page.mouse.click(w / 2, 20); await page.waitForTimeout(200);
  ok(!(await isOpen()), `${w}: fecha tocando fora`);
  await openIt(); await page.mouse.click(w / 2, h - 5 - (touch ? 0 : 300)); await page.waitForTimeout(100);
  ok(await isOpen(), `${w}: clique dentro não fecha`);
  await ctx.close();
}
{
  const { ctx, page } = await open();
  await go(page, '/');
  await page.locator('footer a[href$="/suporte/"]').first().click(); await page.waitForTimeout(300);
  ok(await page.evaluate(() => document.querySelector('#suporte-popup').open && location.pathname === '/'), 'rodapé: "Suporte" abre o popup');
  await page.keyboard.press('Escape');
  await go(page, '/contato/'); await page.locator('main a[href$="/suporte/"]').first().click(); await page.waitForTimeout(300);
  ok(await page.evaluate(() => document.querySelector('#suporte-popup').open && location.pathname === '/contato/'), 'contato: o canal de suporte abre o popup');
  await ctx.close();
  const nojs = await open({ javaScriptEnabled: false });
  await nojs.page.goto(`${base}/suporte/`);
  ok((await nojs.page.locator('main a[href="tel:08004441044"]').count()) === 1 && (await nojs.page.locator(`main a[href="${SUPPORT_WA}"]`).count()) === 1, 'sem JavaScript, /suporte/ tem os mesmos contatos');
  await nojs.ctx.close();
}

/* ---------------------------------------------------------------- PRÉ-SELEÇÃO DO CONTATO */
section('Botões que levam ao contato');
{
  const { ctx, page } = await open();
  const flows = [
    ['hero: Tenho um empreendimento', '.hero a:has-text("Tenho um empreendimento")', 'empreendimento', ''],
    ['hero: Carregar na minha vaga', '.hero a:has-text("Carregar na minha vaga")', 'morador', 'instalacao-vaga'],
    ['hero: Adequação à norma IT-41', '.hero a:has-text("Adequação à norma IT-41")', 'sindico', 'adequacao-it-41'],
    ['caso: Morador', '#solucoes a:has-text("Pedir visita técnica")', 'morador', 'instalacao-vaga'],
    ['caso: Síndico', '#solucoes a:has-text("Falar com um especialista")', 'sindico', ''],
    ['caso: Comércio', '#solucoes a:has-text("Quero oferecer recarga")', 'empreendimento', ''],
    ['Eletrix Hub', '#eletrix-hub a:has-text("Quero o Eletrix Hub")', 'empreendimento', 'eletrix-hub'],
    ['síndicos', 'a:has-text("Agendar avaliação do prédio")', 'sindico', ''],
  ];
  for (const [name, selector, perfil, interesse] of flows) {
    await go(page, '/');
    await page.locator(selector).first().click(); await page.waitForURL('**/contato/**'); await page.waitForTimeout(500);
    const s = await formState(page);
    ok(s.perfil === perfil && s.interesse === interesse, `${name} -> ${s.url} (perfil ${s.perfil}, interesse "${s.interesse || 'a escolher'}")`);
  }
  await go(page, '/parceiros/'); await page.locator('main a:has-text("Falar com um especialista")').click(); await page.waitForURL('**/contato/**'); await page.waitForTimeout(400);
  ok((await formState(page)).perfil === 'empreendimento', 'parceiros: CTA chega como empreendimento');
  await go(page, '/contato/?perfil=morador&interesse=compra-carregador'); let s = await formState(page);
  ok(s.perfil === 'morador' && s.interesse === 'compra-carregador', 'parâmetros na URL aplicados no acesso direto');
  await go(page, '/contato/?perfil=xyz&interesse=abc'); s = await formState(page);
  ok(s.perfil === 'empreendimento' && s.interesse === '', 'parâmetros inválidos são ignorados');
  const options = await page.locator('form select[name=interesse] option:not([disabled])').allTextContents();
  const wanted = ['Eletrix Hub (prédios corporativos e shoppings)', 'Eletrix Rent (condomínios e hotéis)', 'Instalação na minha vaga', 'Compra de carregador', 'Laudo de demanda de energia', 'Infraestrutura seca', 'Controle de demanda', 'Adequação à norma IT-41', 'Troca de operador', 'Ainda não sei'];
  ok(options.join('|') === wanted.join('|'), `lista de serviços completa e sem White label (${options.length})`);
  const contactText = await page.locator('main').innerText();
  ok(!/CNPJ|Angélica|01228/.test(contactText), '/contato/ sem endereço e sem CNPJ no conteúdo');
  for (const p of ['/', '/condominios/', '/empresas/', '/troca-de-operador/', '/instalacao-carregador-residencial/', '/contato/']) {
    await go(page, p);
    const f = await page.evaluate(() => [...document.querySelectorAll('form')].map((x) => [...x.querySelectorAll('input[name],select,textarea')].map((e) => e.name).filter((n) => n !== '_honey').join(',') + `|${x.querySelectorAll('select[name=interesse] option').length}`));
    ok(f.length === 1 && f[0] === 'perfil,perfil,perfil,nome,telefone,email,local,endereco,interesse,mensagem,consent|11', `${p}: mesmo formulário (${f[0]?.slice(-40)})`);
  }
  await ctx.close();
}

/* ---------------------------------------------------------------- CONTATO NO CELULAR */
section('/contato/ na primeira tela do celular');
for (const [w, h] of [[360, 640], [390, 844], [430, 932]]) {
  const { ctx, page } = await open({ viewport: { width: w, height: h }, hasTouch: true });
  await go(page, '/contato/');
  const r = await page.evaluate(() => { const i = document.querySelector('form input[name=nome]').getBoundingClientRect(); const visible = [...document.querySelectorAll('form input:not([type=radio]):not([type=checkbox]):not([tabindex="-1"]), form select')].filter((e) => e.getBoundingClientRect().bottom <= innerHeight).length; return { bottom: Math.round(i.bottom), visible, sw: document.documentElement.scrollWidth }; });
  ok(r.bottom <= h && r.sw <= w, `${w}x${h}: formulário já aparece (primeiro campo termina em ${r.bottom}px; ${r.visible} campo(s) inteiros na primeira tela)`);
  await ctx.close();
}

/* ---------------------------------------------------------------- FORMULÁRIO (envio interceptado) */
section('Envio do formulário (interceptado, nada sai para o FormSubmit)');
{
  const { ctx, page, sent, setForm } = await open({ viewport: { width: 390, height: 844 } });
  await go(page, '/contato/?interesse=laudo-demanda');
  const submit = page.locator('form button[type=submit]');
  await submit.click(); await page.waitForTimeout(250);
  const v = await page.evaluate(() => ({ errors: [...document.querySelectorAll('form [role=alert]')].map((e) => e.textContent), focus: document.activeElement.getAttribute('name') }));
  // nome, telefone, e-mail, condomínio, endereço e consentimento (o interesse já veio da URL)
  ok(v.errors.length === 6 && v.focus === 'nome' && sent.length === 0, `vazio: ${v.errors.length} mensagens de erro, foco no primeiro campo, nada enviado`);
  const fill = async () => { await page.fill('input[name=nome]', 'Teste Interno'); await page.fill('input[name=telefone]', '(11) 98888-7777'); await page.fill('input[name=email]', 'teste@exemplo.com.br'); await page.fill('input[name=local]', 'Condomínio Exemplo'); await page.fill('input[name=endereco]', 'Rua Exemplo, 100, São Paulo'); await page.check('input[name=consent]'); };
  await fill(); await page.fill('input[name=email]', 'teste@'); await submit.click(); await page.waitForTimeout(250);
  ok(/e-mail válido/.test((await page.locator('form [role=alert]').allTextContents()).join()) && sent.length === 0, 'e-mail inválido é apontado');
  setForm('error'); await fill(); await submit.click(); await page.waitForTimeout(700);
  ok(/Não foi possível enviar/.test(await page.locator('form').innerText()) && (await page.inputValue('input[name=nome]')) === 'Teste Interno', 'falha no servidor: mensagem de erro e dados preservados');
  setForm('inactive'); await submit.click(); await page.waitForTimeout(700);
  ok(/Não foi possível enviar/.test(await page.locator('form').innerText()), 'formulário não ativado no FormSubmit não é tratado como sucesso');
  setForm('ok'); await submit.click(); await page.waitForSelector('[role=status]', { timeout: 5000 });
  const p = sent.at(-1);
  ok(/Recebemos a sua mensagem/.test(await page.locator('[role=status]').innerText()), 'sucesso: confirmação na tela');
  const keys = Object.keys(p).filter((k) => !k.startsWith('_'));
  ok(keys.join(', ') === 'Perfil, Interesse, Nome, Telefone ou WhatsApp, E-mail, Empreendimento ou condomínio, Endereço, Mensagem, Página de origem, Consentimento LGPD', `rótulos no e-mail: ${keys.join(', ')}`);
  ok(p.Interesse === 'Laudo de demanda de energia' && p.Perfil === 'Sou síndico(a) ou gestor(a)' && p['Endereço'] === 'Rua Exemplo, 100, São Paulo' && p._replyto === 'teste@exemplo.com.br', `conteúdo correto; assunto: "${p._subject}"`);
  await ctx.close();
}

/* ---------------------------------------------------------------- PARCEIROS */
section('Parceiros');
for (const w of [360, 768, 1440]) {
  const { ctx, page } = await open({ viewport: { width: w, height: 900 }, reducedMotion: 'no-preference' });
  for (const [p, sel] of [['/', '.marquee-group:not(.marquee-copy) img'], ['/parceiros/', '.partner-rows ul:not([aria-hidden]) img']]) {
    await go(page, p);
    const r = await page.evaluate(async (s) => {
      const imgs = [...document.querySelectorAll(s)].filter((i) => i.closest('ul').getBoundingClientRect().width > 0);
      for (const i of imgs) { i.loading = 'eager'; await i.decode().catch(() => {}); }
      return { n: imgs.length, unique: new Set(imgs.map((i) => i.alt)).size, broken: imgs.filter((i) => !i.naturalWidth || i.getBoundingClientRect().height < 12 || i.getBoundingClientRect().width < 30).map((i) => i.alt), names: imgs.map((i) => i.alt) };
    }, sel);
    ok(r.n === 28 && r.unique === 28 && !r.broken.length, `${w} ${p}: ${r.n} logos, ${r.unique} marcas, nenhum sumido ${r.broken.join(',')}`);
    ok(!r.names.some((n) => /Inteli$|RRM|Paris|Padrão|Confiance|Guardian|^SL$|Winpark|Plenty|Slaviero|Pepe|Hazak/.test(n)) && r.names.includes('Livoltek'), `${w} ${p}: lista nova (com Livoltek, sem os que saíram)`);
  }
  await ctx.close();
}

/* ---------------------------------------------------------------- NOTÍCIAS */
section('Notícias');
{
  const { ctx, page } = await open();
  const P = 'https://mobilidade.estadao.com.br/inovacao/como-predios-estao-ganhando-com-a-recarga-eletrica/';
  const O = 'https://mobilidade.estadao.com.br/mobilidade-para-que/descarbonizacao-formula-e-faz-pesquisas-para-ampliar-a-recuperacao-de-energia-nas-frenagens/';
  for (const [p, scope] of [['/', 'section:has(#imp-t)'], ['/imprensa/', '#materias']]) {
    await go(page, p);
    const links = await page.locator(`${scope} article a`).evaluateAll((a) => a.map((x) => [x.closest('article').querySelector('h3').textContent, x.href, x.target, x.rel]));
    ok(links.length === 2 && links[0][1] === P && /prédios/.test(links[0][0]) && links[1][1] === O && /orelhão/.test(links[1][0]) && links.every((l) => l[2] === '_blank' && /noopener/.test(l[3])), `${p}: um botão "Ler a matéria" por cartão, em nova aba`);
  }
  await go(page, '/');
  ok((await page.locator('section:has(#imp-t) a[href$="/imprensa/"]').count()) === 1, 'home: só um link para /imprensa/, o botão "Ver imprensa"');
  const [tab] = await Promise.all([ctx.waitForEvent('page'), page.locator('section:has(#imp-t) article a').first().click()]);
  await tab.waitForLoadState(); ok(tab.url() === P, 'clique abre a matéria em outra aba (resposta interceptada; o site do Estadão não foi aberto)'); await tab.close();
  await page.getByRole('link', { name: 'Ver imprensa' }).click(); await page.waitForURL('**/imprensa/'); ok(true, '"Ver imprensa" leva a /imprensa/');
  await ctx.close();
}

/* ---------------------------------------------------------------- REDIRECIONAMENTOS */
section('Rotas antigas');
{
  const { ctx, page } = await open();
  for (const [from, to] of [['/app/', '/#app'], ['/empreendimentos/', '/#estacoes'], ['/estacoes/', '/#estacoes'], ['/eletroposto-tarifado/', '/eletrix-hub/'], ['/#partners', '/parceiros/'], ['/#portfolio', '/#estacoes'], ['/#media', '/imprensa/']]) {
    await page.goto('about:blank'); await page.goto(base + from); await page.waitForTimeout(1200);
    const url = page.url().replace(base, '');
    ok(url === to, `${from} -> ${url}`);
  }
  await page.goto(`${base}/pagina-que-nao-existe/`);
  ok(/Essa página não está por aqui/.test(await page.locator('h1').innerText()), '404 própria, com caminhos');
  await ctx.close();
}

/* ---------------------------------------------------------------- MOVIMENTO REDUZIDO */
section('Movimento reduzido: nada se mexe sozinho');
for (const w of [1440, 390]) {
  const { ctx, page } = await open({ viewport: { width: w, height: 844 } });
  // o balão do WhatsApp aparece (sem animação) depois de 4 s: aqui ele entra como já fechado
  await ctx.addInitScript(() => sessionStorage.setItem('eletrix-wa-balao', '1'));
  for (const p of ['/', '/parceiros/', '/contato/']) {
    await go(page, p);
    // imagens carregadas antes de comparar os quadros
    await page.evaluate(async () => { for (const i of document.images) { i.loading = 'eager'; await i.decode().catch(() => {}); } await document.fonts.ready; });
    await page.waitForTimeout(p === '/' ? 3000 : 800);
    const total = await page.evaluate(() => document.body.scrollHeight);
    const moving = [];
    for (let y = 0; y < total; y += 800) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(450);
      const a = await page.screenshot();
      await page.waitForTimeout(y < 1700 || y % 1600 === 0 ? 3300 : 900);
      const b = await page.screenshot();
      if (!a.equals(b)) { moving.push(y); fs.mkdirSync('qa/tmp', { recursive: true }); fs.writeFileSync(`qa/tmp/rm-${w}-${y}-a.png`, a); fs.writeFileSync(`qa/tmp/rm-${w}-${y}-b.png`, b); }
    }
    const anims = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').map((a) => a.animationName || a.transitionProperty));
    ok(!moving.length && !anims.length, `${w} ${p}: quadros iguais em todas as posições e nenhuma animação rodando ${moving.join(',')} ${anims.join(',')}`);
  }
  await ctx.close();
}
{
  const { ctx, page } = await open();
  await page.goto(base + '/'); await page.waitForTimeout(150);
  const n = await page.locator('.hero dd span[aria-hidden] span:last-child').allTextContents();
  ok(n.join(' ') === '+300 +22 +11 +6 mil', `números finais direto: ${n.join(' ')}`);
  await ctx.close();
  const m = await open({ reducedMotion: 'no-preference' });
  await m.page.goto(base + '/'); await m.page.waitForTimeout(700);
  const mid = await m.page.locator('.hero dd span[aria-hidden] span:last-child').allTextContents();
  await m.page.waitForTimeout(2600);
  const end = await m.page.locator('.hero dd span[aria-hidden] span:last-child').allTextContents();
  ok(mid.join() !== end.join() && end.join(' ') === '+300 +22 +11 +6 mil', `contagem em escadinha: ${mid.join(' ')} -> ${end.join(' ')}`);
  await m.ctx.close();
}

/* ---------------------------------------------------------------- TECLADO */
section('Teclado: home inteira');
for (const w of [1440, 390]) {
  const { ctx, page } = await open({ viewport: { width: w, height: 844 } });
  await go(page, '/');
  const invisible = [];
  const reached = new Set();
  let count = 0, wrapped = false;
  for (let i = 0; i < 170 && !wrapped; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(60);
    const f = await page.evaluate(() => {
      const e = document.activeElement;
      if (!e || e === document.body) return null;
      const s = getComputedStyle(e);
      const peer = e.matches('input[type=radio]') ? getComputedStyle(e.nextElementSibling) : null;
      const outline = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (peer && peer.outlineStyle !== 'none') || s.boxShadow.includes('rgb');
      const r = e.getBoundingClientRect();
      let o = 1; for (let x = e; x; x = x.parentElement) o *= +getComputedStyle(x).opacity;
      const label = (e.getAttribute('aria-label') || e.textContent || e.getAttribute('name') || e.tagName).trim().slice(0, 40);
      const id = e.dataset.qa || (e.dataset.qa = String(Math.random()));
      return { id, label, ok: !!outline && r.width > 0 && r.bottom > 0 && r.top < innerHeight && (o > 0.3 || peer) };
    });
    if (!f) continue;
    if (reached.has(f.id)) { wrapped = true; break; }
    reached.add(f.id); count++;
    if (!f.ok) invisible.push(f.label);
  }
  const expected = await page.evaluate(() => {
    const radios = new Set();
    return [...document.querySelectorAll('a[href],button:not([disabled]),input:not([tabindex="-1"]),select,textarea,summary,[tabindex="0"]')].filter((e) => {
      if (!e.getClientRects().length || e.closest('[hidden],dialog:not([open]),[inert]') || getComputedStyle(e).visibility === 'hidden') return false;
      if (e.closest('details:not([open])') && !e.matches('summary')) return false;
      if (e.type === 'radio') { if (radios.has(e.name)) return false; radios.add(e.name); }
      return true;
    }).length;
  });
  ok(count >= expected - 2, `${w}: ${count} paradas de teclado de ${expected} elementos focáveis visíveis`);
  ok(!invisible.length, `${w}: foco sempre visível ${invisible.slice(0, 6).join(' | ')}`);
  await ctx.close();
}

/* ---------------------------------------------------------------- TODAS AS PÁGINAS */
section('Todas as páginas');
for (const w of [320, 360, 390, 768, 1024]) {
  const { ctx, page } = await open({ viewport: { width: w, height: 800 } });
  const bad = [];
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'load' });
    const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length }));
    if (r.sw > w) bad.push(`${p} vaza ${r.sw}`);
    if (r.h1 !== 1) bad.push(`${p} H1 x${r.h1}`);
  }
  ok(!bad.length, `${w}px: ${pages.length} páginas sem rolagem horizontal e com um H1 ${bad.slice(0, 5).join(' | ')}`);
  await ctx.close();
}
{
  const { ctx, page } = await open();
  const found = [];
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    const t = await page.evaluate(() => document.documentElement.outerHTML);
    const text = await page.locator('body').innerText();
    if (/\+250\b|\+20 cidades|\+10 estados|\+5 mil|250 estações|mais de 20 cidades/.test(text + t.match(/<meta[^>]+>/g)?.join(''))) found.push(`${p} número antigo`);
    if (/R\$ ?1\.799|R\$ ?449|movE|michel[-_]khafif|href="\/(app|empreendimentos|estacoes)\/"/i.test(t)) found.push(`${p} conteúdo proibido ou link antigo`);
    if (/\binsights\b|colaboração|marco importante/i.test(text)) found.push(`${p} palavra proibida`);
    for (const a of await page.locator('a[href^="https://wa.me/"]').evaluateAll((x) => x.map((e) => e.href))) if (!/wa\.me\/(5511965755730|5511919552120)\?text=/.test(a)) found.push(`${p} WhatsApp ${a.slice(0, 50)}`);
  }
  ok(!found.length, `varredura de conteúdo: sem números antigos, preço de IT-41, links removidos ou WhatsApp fora dos dois números ${found.slice(0, 6).join(' | ')}`);
  await ctx.close();
}
ok(!errors.size, `console sem erros ${[...errors].slice(0, 6).join(' || ')}`);

await browser.close();
console.log(`\n${passes} verificações ok, ${fails} falha(s)`);
process.exit(fails ? 1 : 0);
