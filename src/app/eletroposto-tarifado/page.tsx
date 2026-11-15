import type { Metadata } from 'next';
import { LegacyRedirect } from '@/components/sections/LegacyRedirect';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Página movida | Eletrix',
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl('/eletrix-hub/') },
};

export default function Page() {
  return <LegacyRedirect to="/eletrix-hub/" label="o Eletrix Hub" />;
}
