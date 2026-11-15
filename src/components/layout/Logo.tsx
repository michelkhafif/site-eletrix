import Link from 'next/link';
import { withBase } from '@/config/site';

/** Logo oficial. 'escuro' = para fundo escuro (ELE branco). Proporção do SVG recortado: 651,93 x 89,28. */
export function Logo({ variant = 'escuro', height = 22, className = '' }: { variant?: 'escuro' | 'claro'; height?: number; className?: string }) {
  const w = Math.round((651.93 / 89.28) * height);
  return (
    <Link href="/" aria-label="Eletrix, página inicial" className={`inline-flex shrink-0 items-center ${className}`}>
      <img src={withBase(`/brand/eletrix-logo-${variant}.svg`)} alt="Eletrix" width={w} height={height} style={{ height, width: 'auto' }} />
    </Link>
  );
}
