import type { Metadata } from 'next';
import { LegacyRedirect } from '@/components/sections/LegacyRedirect';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Página movida | Eletrix',
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl('/') },
};

export default function Page() {
  return <LegacyRedirect to="/#estacoes" label="a seção Estações" />;
}
