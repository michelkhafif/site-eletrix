import type { ReactNode } from 'react';

/** Moldura de iPhone em CSS: borda fina em aço escuro, ilha dinâmica, botões laterais e sombra suave. */
export function PhoneMockup({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[9/19.3] w-[min(270px,72vw)] ${className}`}>
      {/* botões laterais */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[17%] h-7 w-[3px] rounded-l bg-ink-600" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[25%] h-11 w-[3px] rounded-l bg-ink-600" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[35%] h-11 w-[3px] rounded-l bg-ink-600" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[28%] h-16 w-[3px] rounded-r bg-ink-600" />
      <div className="absolute inset-0 rounded-[2.7rem] bg-gradient-to-b from-ink-500 via-ink-700 to-ink-600 p-[2px] shadow-[0_40px_70px_-25px_rgba(5,11,20,.55),0_12px_24px_-12px_rgba(5,11,20,.4)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] border-[7px] border-ink-950 bg-ink-950">
          <div className="relative h-full w-full overflow-hidden rounded-[2.05rem]">{children}</div>
          <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-[1.15rem] w-[34%] -translate-x-1/2 rounded-full bg-ink-950" />
        </div>
      </div>
    </div>
  );
}
