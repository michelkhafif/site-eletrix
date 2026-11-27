import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { MotionProvider } from '@/components/ui/MotionProvider';
import { Analytics } from '@/components/layout/Analytics';
import { SupportDialog } from '@/components/support/SupportDialog';
import { SITE_URL, site, withBase } from '@/config/site';

// Fontes variáveis self-hosted (subconjunto latin, cobre o português). Build sem dependência de rede.
const display = localFont({ src: '../fonts/manrope-latin-wght-normal.woff2', weight: '200 800', variable: '--font-display', display: 'swap' });
const text = localFont({ src: '../fonts/inter-latin-wght-normal.woff2', weight: '100 900', variable: '--font-text', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + '/'),
  applicationName: site.name,
  title: { default: 'Eletrix | Carregando seu futuro', template: '%s' },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  icons: { icon: [{ url: withBase('/favicon.svg'), type: 'image/svg+xml' }], apple: withBase('/apple-touch-icon.png') },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: '#050B14', colorScheme: 'light', width: 'device-width', initialScale: 1 };

const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <Header />
        <main id="conteudo" style={{ minHeight: '60vh' }}>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <SupportDialog />
        <MotionProvider />
        <Analytics />
      </body>
    </html>
  );
}
