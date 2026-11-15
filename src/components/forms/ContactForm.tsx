'use client';
import { useId, useState } from 'react';
import Link from 'next/link';
import { site, whatsappLink } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { wa } from '@/data/whatsapp';

export type FormProfile = 'gestor' | 'morador' | 'sindico' | 'geral';

type Field = { name: string; label: string; type?: 'text' | 'email' | 'tel' | 'select' | 'textarea'; options?: string[]; required?: boolean; placeholder?: string; autoComplete?: string; half?: boolean };

const common: Field[] = [
  { name: 'nome', label: 'Seu nome', required: true, autoComplete: 'name', half: true },
  { name: 'telefone', label: 'Telefone / WhatsApp', type: 'tel', required: true, autoComplete: 'tel', placeholder: '(11) 90000-0000', half: true },
  { name: 'email', label: 'E-mail', type: 'email', required: true, autoComplete: 'email' },
];

const profiles: Record<FormProfile, { subject: string; fields: Field[]; button: string; message: string }> = {
  gestor: {
    subject: 'Novo contato: empreendimento (site)',
    button: 'Agendar visita técnica',
    message: wa.empreendimento,
    fields: [
      ...common,
      { name: 'empreendimento', label: 'Empresa ou empreendimento', required: true, half: true },
      { name: 'cargo', label: 'Cargo', half: true },
      { name: 'cidade', label: 'Cidade', required: true, half: true, autoComplete: 'address-level2' },
      { name: 'vagas', label: 'Nº de vagas ou de carregadores', half: true, placeholder: 'Ex.: 120 vagas' },
      { name: 'interesse', label: 'Tenho interesse em', type: 'select', options: ['Eletrix Hub', 'Eletrix Rent', 'Trocar a operadora atual', 'White label', 'Ainda não sei'], required: true },
      { name: 'mensagem', label: 'Mensagem (opcional)', type: 'textarea' },
    ],
  },
  sindico: {
    subject: 'Novo contato: síndico / condomínio (site)',
    button: 'Pedir orientação ao time',
    message: wa.sindico,
    fields: [
      ...common,
      { name: 'condominio', label: 'Nome do condomínio', required: true, half: true },
      { name: 'cidade', label: 'Cidade', required: true, half: true, autoComplete: 'address-level2' },
      { name: 'infra', label: 'Situação atual', type: 'select', required: true, options: ['Ainda não temos nenhuma estrutura', 'Já há moradores com carro elétrico pedindo', 'Já temos carregadores de outra operadora', 'Queremos regularizar na IT-41'] },
      { name: 'mensagem', label: 'Mensagem (opcional)', type: 'textarea' },
    ],
  },
  morador: {
    subject: 'Novo contato: morador, visita técnica (site)',
    button: 'Agendar visita técnica gratuita',
    message: wa.morador,
    fields: [
      ...common,
      { name: 'condominio', label: 'Condomínio', required: true, half: true },
      { name: 'cidade', label: 'Cidade', required: true, half: true, autoComplete: 'address-level2' },
      { name: 'carro', label: 'Modelo do carro', half: true, placeholder: 'Ex.: BYD Dolphin' },
      { name: 'infra', label: 'O prédio tem infraestrutura de recarga?', type: 'select', half: true, options: ['Não sei', 'Sim', 'Não'] },
      { name: 'mensagem', label: 'Mensagem (opcional)', type: 'textarea' },
    ],
  },
  geral: {
    subject: 'Novo contato (site)',
    button: 'Enviar mensagem',
    message: wa.geral,
    fields: [
      ...common,
      { name: 'assunto', label: 'Assunto', type: 'select', required: true, options: ['Tenho um empreendimento', 'Sou síndico(a) ou gestor(a) de condomínio', 'Quero instalar na minha vaga', 'Quero comprar um carregador', 'Imprensa', 'Outro assunto'] },
      { name: 'mensagem', label: 'Mensagem', type: 'textarea', required: true },
    ],
  },
};

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm({ profile = 'geral', origin, tone = 'light' }: { profile?: FormProfile; origin?: string; tone?: 'light' | 'dark' }) {
  const cfg = profiles[profile];
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const input = `w-full rounded-xl border px-4 py-3 text-[0.98rem] outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 ${tone === 'dark' ? 'border-white/15 bg-white/5 text-white' : 'border-slate-300 bg-white text-ink-900'}`;

  function validate(fd: FormData) {
    const e: Record<string, string> = {};
    for (const f of cfg.fields) {
      const v = String(fd.get(f.name) ?? '').trim();
      if (f.required && !v) e[f.name] = 'Preencha este campo.';
      else if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.name] = 'Informe um e-mail válido, como nome@empresa.com.br.';
      else if (f.type === 'tel' && v && v.replace(/\D/g, '').length < 10) e[f.name] = 'Informe o telefone com DDD.';
    }
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
      const first = Object.keys(e)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus('sending');
    const payload: Record<string, string> = { _subject: cfg.subject, _template: 'table', _captcha: 'false', origem: origin ?? (typeof location !== 'undefined' ? location.pathname : '') };
    for (const f of cfg.fields) payload[f.label] = String(fd.get(f.name) ?? '').trim();
    payload['Consentimento LGPD'] = 'Sim';
    try {
      const res = await fetch(site.form.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className={`rounded-3xl border p-8 ${tone === 'dark' ? 'border-white/15 bg-white/5 text-white' : 'border-brand-500/30 bg-brand-500/[0.06] text-ink-900'}`}>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-ink-950"><Icon name="check" size={24} strokeWidth={2.4} /></span>
        <h3 className="mt-5 font-display text-2xl font-bold">Recebemos a sua mensagem.</h3>
        <p className={`mt-2 ${tone === 'dark' ? 'text-muted-dark' : 'text-muted'}`}>O time comercial responde em horário comercial. Se for urgente, fale agora no WhatsApp.</p>
        <a href={whatsappLink(cfg.message)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand-500 px-6 font-semibold text-ink-950 hover:bg-brand-400"><Icon name="whatsapp" size={18} /> Falar no WhatsApp</a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${uid}-hint`} className="grid gap-5 sm:grid-cols-2">
      {cfg.fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const err = errors[f.name];
        const span = f.half ? '' : 'sm:col-span-2';
        const common = {
          id, name: f.name, required: f.required, autoComplete: f.autoComplete, 'aria-invalid': err ? true : undefined,
          'aria-describedby': err ? `${id}-err` : undefined, className: `${input} ${err ? 'border-red-500' : ''}`,
        };
        return (
          <div key={f.name} className={span}>
            <label htmlFor={id} className={`mb-1.5 block text-sm font-medium ${tone === 'dark' ? 'text-white' : 'text-ink-900'}`}>
              {f.label}{f.required && <span className={tone === 'dark' ? 'text-brand-400' : 'text-brand-700'} aria-hidden="true"> *</span>}
            </label>
            {f.type === 'select' ? (
              <select {...common} defaultValue="">
                <option value="" disabled>Selecione</option>
                {f.options!.map((o) => <option key={o} value={o} className="text-ink-900">{o}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea {...common} rows={4} />
            ) : (
              <input {...common} type={f.type ?? 'text'} placeholder={f.placeholder} inputMode={f.type === 'tel' ? 'tel' : undefined} />
            )}
            {err && <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-red-500">{err}</p>}
          </div>
        );
      })}

      {/* honeypot antispam: escondido de pessoas e leitores de tela */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Não preencha<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="sm:col-span-2">
        <label className={`flex items-start gap-3 text-sm ${tone === 'dark' ? 'text-muted-dark' : 'text-muted'}`}>
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 shrink-0 accent-brand-500" aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? `${uid}-consent-err` : undefined} />
          <span>Concordo com o uso dos meus dados para contato sobre a minha solicitação, conforme a <Link href="/politica-de-privacidade/" className="font-medium underline underline-offset-4" target="_blank">política de privacidade</Link>.</span>
        </label>
        {errors.consent && <p id={`${uid}-consent-err`} role="alert" className="mt-1.5 text-sm text-red-500">{errors.consent}</p>}
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'sending'}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 font-semibold text-ink-950 shadow-[0_8px_24px_-10px_rgba(16,183,255,.7)] transition hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-60">
          {status === 'sending' ? 'Enviando…' : cfg.button}
          {status !== 'sending' && <Icon name="arrowRight" size={18} />}
        </button>
        <p id={`${uid}-hint`} className={`mt-3 text-sm ${tone === 'dark' ? 'text-muted-dark' : 'text-muted'}`}>Campos com * são obrigatórios. Respondemos em horário comercial.</p>
        {status === 'error' && (
          <p role="alert" className="mt-3 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-600">
            Não foi possível enviar agora. Tente de novo ou{' '}
            <a className="font-semibold underline" href={whatsappLink(cfg.message)} target="_blank" rel="noopener noreferrer">fale com a gente no WhatsApp</a>.
          </p>
        )}
      </div>
    </form>
  );
}

const tabs: { id: FormProfile; label: string }[] = [
  { id: 'gestor', label: 'Tenho um empreendimento' },
  { id: 'sindico', label: 'Sou síndico(a)' },
  { id: 'morador', label: 'Sou morador(a)' },
];

/** Formulário com escolha de perfil: cada perfil tem campos próprios. */
export function ContactTabs({ initial = 'gestor', tone = 'light', origin }: { initial?: FormProfile; tone?: 'light' | 'dark'; origin?: string }) {
  const [p, setP] = useState<FormProfile>(initial);
  return (
    <div>
      <div role="group" aria-label="Escolha o seu perfil" className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} type="button" aria-pressed={p === t.id} onClick={() => setP(t.id)}
            className={`h-10 rounded-full border px-4 text-sm font-semibold transition ${p === t.id ? 'border-brand-500 bg-brand-500 text-ink-950' : tone === 'dark' ? 'border-white/20 text-white hover:border-white/60' : 'border-slate-300 text-ink-900 hover:border-ink-900'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <ContactForm key={p} profile={p} tone={tone} origin={origin} />
    </div>
  );
}
