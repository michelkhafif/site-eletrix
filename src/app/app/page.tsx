import type { Metadata } from 'next';
import { LegacyRedirect } from '@/components/sections/LegacyRedirect';
import { absoluteUrl } from '@/config/site';

/** A antiga página do app virou a seção #app da home. Mantida só para não quebrar links. */
export const metadata: Metadata = {
  title: 'Página movida | Eletrix',
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl('/') },
};

export default function Page() {
  return <LegacyRedirect to="/#app" label="a seção do aplicativo" />;
}
