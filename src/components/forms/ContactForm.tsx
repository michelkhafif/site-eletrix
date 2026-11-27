'use client';
import { Suspense, useCallback, useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { site, whatsappLink } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { wa } from '@/data/whatsapp';
import { isServiceId, services, toProfileId, type ContactContext, type ProfileId, type ServiceId } from '@/data/services';

/** Um único formulário para o site todo: mesmos campos, mesmas opções, mesmo visual. */
const profiles: Record<ProfileId, { tab: string; label: string; place: string; placeRequired: boolean; button: string; message: string }> = {
  empreendimento: { tab: 'Empreendimento', label: 'Tenho um empreendimento', place: 'Empresa ou empreendimento', placeRequired: true, button: 'Agendar visita técnica', message: wa.empreendimento },
  sindico: { tab: 'Síndico', label: 'Sou síndico(a) ou gestor(a)', place: 'Nome do condomínio', placeRequired: true, button: 'Pedir avaliação do prédio', message: wa.sindico },
  morador: { tab: 'Morador', label: 'Sou morador(a)', place: 'Condomínio ou prédio', placeRequired: false, button: 'Agendar visita técnica gratuita', message: wa.morador },
};

const messageByService: Partial<Record<ServiceId, string>> = {
  'eletrix-hub': wa.hub, 'eletrix-rent': wa.rent, 'instalacao-vaga': wa.morador, 'compra-carregador': wa.carregador,
  'laudo-demanda': wa.laudo, 'infraestrutura-seca': wa.infra, 'controle-demanda': wa.demanda, 'adequacao-it-41': wa.it41, 'troca-operador': wa.troca,
};

type Status = 'idle' | 'sending' | 'success' | 'error';

/** Lê ?perfil=...&interesse=... (o site é estático: a leitura é feita no navegador). */
function Params({ onChange }: { onChange: (c: ContactContext) => void }) {
  const q = useSearchParams();
  const perfil = q.get('perfil');
  const interesse = q.get('interesse');
  useEffect(() => {
    const s = isServiceId(interesse) ? interesse : undefined;
    const p = toProfileId(perfil) ?? services.find((x) => x.id === s)?.profile ?? undefined;
    if (p || s) onChange({ perfil: p, interesse: s });
  }, [perfil, interesse, onChange]);
  return null;
}

export function ContactForm({ initial = {}, origin, readParams = false }: { initial?: ContactContext; origin?: string; readParams?: boolean }) {
  const uid = useId();
  const [profile, setProfile] = useState<ProfileId>(initial.perfil ?? services.find((s) => s.id === initial.interesse)?.profile ?? 'empreendimento');
  const [interest, setInterest] = useState<ServiceId | ''>(initial.interesse ?? '');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const cfg = profiles[profile];
  const message = (interest && messageByService[interest]) || cfg.message;

  const apply = useCallback((c: ContactContext) => {
    if (c.perfil) setProfile(c.perfil);
    if (c.interesse) setInterest(c.interesse);
  }, []);

  const fields = [
    { name: 'nome', label: 'Seu nome', type: 'text', required: true, autoComplete: 'name', span: '' },
    { name: 'telefone', label: 'Telefone ou WhatsApp', type: 'tel', required: true, autoComplete: 'tel', placeholder: '(11) 90000-0000', span: '' },
    { name: 'email', label: 'E-mail', type: 'email', required: true, autoComplete: 'email', span: '' },
    { name: 'local', label: cfg.place, type: 'text', required: cfg.placeRequired, autoComplete: 'organization', span: '' },
    { name: 'endereco', label: 'Endereço', type: 'text', required: true, autoComplete: 'street-address', placeholder: 'Rua, número, bairro e cidade', span: 'sm:col-span-2' },
  ] as const;

  function validate(fd: FormData) {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const v = String(fd.get(f.name) ?? '').trim();
      if (f.required && !v) e[f.name] = f.name === 'endereco' ? 'Informe o endereço do local.' : 'Preencha este campo.';
      else if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.name] = 'Informe um e-mail válido, como nome@empresa.com.br.';
      else if (f.type === 'tel' && v && v.replace(/\D/g, '').length < 10) e[f.name] = 'Informe o telefone com DDD.';
    }
    if (!fd.get('interesse')) e.interesse = 'Escolha uma opção. Se tiver dúvida, use “Ainda não sei”.';
    if (!fd.get('consent')) e.consent = 'Para enviar, precisamos do seu consentimento.';
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    if (fd.get('_honey')) { setStatus('success'); return; }
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      (form.elements.namedItem(Object.keys(e)[0]) as HTMLElement | null)?.focus();
      return;
    }
    setStatus('sending');
    const value = (n: string) => String(fd.get(n) ?? '').trim();
    const serviceLabel = services.find((s) => s.id === interest)?.label ?? '';
    // As chaves viram os rótulos das linhas no e-mail recebido.
    const payload: Record<string, string> = {
      _subject: `Contato pelo site: ${serviceLabel} (${cfg.label.toLowerCase()})`,
      _template: 'table',
      _captcha: 'false',
      _replyto: value('email'),
      Perfil: cfg.label,
      Interesse: serviceLabel,
      Nome: value('nome'),
      'Telefone ou WhatsApp': value('telefone'),
      'E-mail': value('email'),
      'Empreendimento ou condomínio': value('local') || 'Não informado',
      Endereço: value('endereco'),
      Mensagem: value('mensagem') || 'Sem mensagem',
      'Página de origem': origin ?? (typeof location !== 'undefined' ? location.pathname : ''),
      'Consentimento LGPD': 'Sim',
    };
    try {
      const res = await fetch(site.form.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      const body = await res.json().catch(() => null);
      if (!res.ok || String(body?.success) === 'false') throw new Error(String(res.status));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const input = 'block h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-base text-ink-900 outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-500/30 aria-[invalid=true]:border-red-600';
  const label = 'mb-1 block text-sm font-semibold text-ink-900';
  const errorText = (id: string, msg?: string) => msg && <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-red-700">{msg}</p>;

  const params = readParams && <Suspense fallback={null}><Params onChange={apply} /></Suspense>;

  if (status === 'success') {
    return (
      <div role="status" className="py-4">
        {params}
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-ink-950"><Icon name="check" size={24} strokeWidth={2.4} /></span>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink-900">Recebemos a sua mensagem.</h3>
        <p className="mt-2 text-fg-muted">O time comercial responde em horário comercial. Se for urgente, fale agora no WhatsApp.</p>
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand-500 px-6 font-semibold text-ink-950 hover:bg-brand-400"><WhatsAppGlyph size={18} /> Falar no WhatsApp</a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${uid}-hint`} className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2" data-wa-avoid>
      {params}
      <fieldset className="sm:col-span-2">
        <legend className="sr-only">Qual é o seu perfil?</legend>
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-1 rounded-full bg-slate-100 p-1 sm:grid-cols-3">
          {(Object.keys(profiles) as ProfileId[]).map((p) => (
            <label key={p} className="relative">
              <input type="radio" name="perfil" value={p} checked={profile === p} onChange={() => setProfile(p)} className="peer absolute inset-0 cursor-pointer opacity-0" />
              <span className="pointer-events-none flex h-10 items-center justify-center rounded-full px-1 text-center text-[0.82rem] font-semibold text-slate-700 transition peer-checked:bg-ink-900 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-600 sm:text-sm">
                {profiles[p].tab}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const err = errors[f.name];
        return (
          <div key={f.name} className={f.span}>
            <label htmlFor={id} className={label}>{f.label}{!f.required && <span className="font-normal text-fg-muted"> (opcional)</span>}</label>
            <input id={id} name={f.name} type={f.type} required={f.required} autoComplete={f.autoComplete} placeholder={'placeholder' in f ? f.placeholder : undefined}
              inputMode={f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : undefined} aria-invalid={err ? true : undefined} aria-describedby={err ? `${id}-err` : undefined} className={input} />
            {errorText(id, err)}
          </div>
        );
      })}

      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-interesse`} className={label}>Tenho interesse em</label>
        <div className="relative">
          <select id={`${uid}-interesse`} name="interesse" required value={interest} onChange={(e) => setInterest(e.target.value as ServiceId)}
            aria-invalid={errors.interesse ? true : undefined} aria-describedby={errors.interesse ? `${uid}-interesse-err` : undefined} className={`${input} appearance-none pr-10`}>
            <option value="" disabled>Selecione</option>
            {services.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <Icon name="chevronDown" size={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
        </div>
        {errorText(`${uid}-interesse`, errors.interesse)}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${uid}-mensagem`} className={label}>Mensagem<span className="font-normal text-fg-muted"> (opcional)</span></label>
        <textarea id={`${uid}-mensagem`} name="mensagem" rows={3} className={`${input} h-auto min-h-[5.5rem] py-3`} />
      </div>

      {/* honeypot antispam: escondido de pessoas e leitores de tela */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Não preencha<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm leading-snug text-fg-muted">
          <input type="checkbox" name="consent" className="mt-0.5 h-5 w-5 shrink-0 accent-brand-600" aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? `${uid}-consent-err` : undefined} />
          <span>Concordo com o uso dos meus dados para contato sobre a minha solicitação, conforme a <Link href="/politica-de-privacidade/" className="font-semibold text-accent underline underline-offset-4" target="_blank">política de privacidade</Link>.</span>
        </label>
        {errorText(`${uid}-consent`, errors.consent)}
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'sending'}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-8 font-semibold text-ink-950 shadow-[0_8px_24px_-10px_rgba(16,183,255,.7)] transition hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:translate-y-px disabled:opacity-60">
          {status === 'sending' ? 'Enviando…' : cfg.button}
          {status !== 'sending' && <Icon name="arrowRight" size={18} />}
        </button>
        <p id={`${uid}-hint`} className="mt-2.5 text-center text-sm text-fg-muted">Respondemos em horário comercial.</p>
        {status === 'error' && (
          <p role="alert" className="mt-3 rounded-xl border border-red-600/40 bg-red-50 p-3 text-sm text-red-800">
            Não foi possível enviar agora. Seus dados continuam preenchidos: tente de novo ou{' '}
            <a className="font-semibold underline" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">fale com a gente no WhatsApp</a>.
          </p>
        )}
      </div>
    </form>
  );
}
