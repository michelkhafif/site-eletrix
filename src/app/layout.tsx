import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { MotionProvider } from '@/components/ui/MotionProvider';
import { Analytics } from '@/components/layout/Analytics';
import { SITE_URL, site, withBase } from '@/config/site';

const display = Manrope({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-display', display: 'swap' });
const text = Inter({ subsets: ['latin'], variable: '--font-text', display: 'swap' });

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
    <html lang="pt-BR" className={`${display.variable} ${text.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <Header />
        <main id="conteudo" style={{ minHeight: '60vh' }}>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <MotionProvider />
        <Analytics />
      </body>
    </html>
  );
}
