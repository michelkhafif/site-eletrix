import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'dark';
type Size = 'md' | 'lg' | 'sm';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight text-center sm:whitespace-nowrap transition-[background,color,border-color,box-shadow,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-500 text-ink-950 hover:bg-brand-400 active:bg-brand-600 active:translate-y-px focus-visible:outline-brand-500 shadow-[0_8px_24px_-10px_rgba(16,183,255,.7)]',
  dark: 'bg-ink-900 text-white hover:bg-ink-700 active:bg-ink-950 focus-visible:outline-ink-900',
  secondary: 'bg-ink-900 text-white hover:bg-ink-700 active:bg-ink-950 focus-visible:outline-brand-700',
  onDark: 'border border-brand-400/60 bg-brand-500/15 text-white hover:bg-brand-500/30 hover:border-brand-400 active:bg-brand-500/40 focus-visible:outline-brand-400',
  ghost: 'text-accent hover:opacity-80 px-0 focus-visible:outline-brand-500',
};
const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-4 py-1.5 text-sm',
  md: 'min-h-12 px-6 py-2 text-[0.95rem]',
  lg: 'min-h-14 px-7 py-2.5 text-base sm:px-8',
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName | null;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export function Button({ href, children, variant = 'primary', size = 'md', icon = null, external, className = '', ariaLabel, onClick }: Props) {
  const cls = `${base} ${variants[variant]} ${variant === 'ghost' ? '' : sizes[size]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith('http');
    return (
      <a href={href} className={cls} aria-label={ariaLabel} onClick={onClick} data-wa-avoid {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel} onClick={onClick} data-wa-avoid>
      {inner}
    </Link>
  );
}
