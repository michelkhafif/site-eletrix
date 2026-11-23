import { site } from '@/config/site';

const AppleMark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.37 12.63c-.02-2.24 1.83-3.32 1.92-3.37-1.05-1.53-2.67-1.74-3.25-1.76-1.38-.14-2.7.81-3.4.81-.71 0-1.78-.79-2.93-.77-1.5.02-2.9.88-3.68 2.23-1.57 2.72-.4 6.75 1.12 8.96.75 1.08 1.64 2.29 2.81 2.25 1.13-.05 1.55-.73 2.92-.73 1.36 0 1.74.73 2.93.7 1.21-.02 1.98-1.1 2.72-2.19.86-1.25 1.21-2.47 1.23-2.53-.03-.01-2.36-.91-2.39-3.6ZM14.14 6.03c.62-.75 1.04-1.8.92-2.84-.89.04-1.97.6-2.61 1.35-.57.66-1.07 1.73-.94 2.75.99.08 2-.5 2.63-1.26Z" />
  </svg>
);
const PlayMark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.2 2.6c-.2.2-.3.6-.3 1v16.8c0 .4.1.8.3 1l9.4-9.4L4.2 2.6Zm10.8 10.1 2.6 2.6-11.5 6.5 8.9-9.1Zm0-1.4L6.1 2.2l11.5 6.5-2.6 2.6Zm4.5.7c.6.4.6 1.2 0 1.6l-1.5.9-2.8-2.8 2.8-2.8 1.5.9c.6.4.6 1.2 0 2.2Z" />
  </svg>
);

export function StoreBadges({ className = '' }: { className?: string }) {
  const cls = 'inline-flex h-12 items-center gap-3 rounded-xl border border-white/20 bg-black px-4 text-white transition hover:border-white/50';
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={site.app.appStore} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Baixar na App Store: app Eletrix">
        <AppleMark />
        <span className="leading-tight"><span className="block text-[0.62rem] uppercase tracking-wider text-white/70">Baixar na</span><span className="block text-[0.95rem] font-semibold">App Store</span></span>
      </a>
      <a href={site.app.playStore} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Disponível no Google Play: app Eletrix">
        <PlayMark />
        <span className="leading-tight"><span className="block text-[0.62rem] uppercase tracking-wider text-white/70">Disponível no</span><span className="block text-[0.95rem] font-semibold">Google Play</span></span>
      </a>
    </div>
  );
}
