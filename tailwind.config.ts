import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem' }, screens: { '2xl': '1240px' } },
    extend: {
      colors: {
        ink: {
          950: '#050B14',
          900: '#0A1220',
          800: '#0F1B2D',
          700: '#17263D',
          600: '#243653',
          500: '#3A4C6B',
        },
        brand: {
          50: '#EAF8FF',
          100: '#D3F0FF',
          300: '#8EDDFF',
          400: '#4CCBFF',
          500: '#10B7FF',
          600: '#0A97D6',
          700: '#0877AD',
          800: '#0A5F8A',
        },
        paper: '#F5F8FB',
        line: '#E2E8F0',
        muted: '#4A5B72',
        'muted-dark': '#9FB0C8',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        hair: 'var(--hair)',
        card: 'var(--card)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-text)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 1.6rem + 4.4vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '800' }],
        h1: ['clamp(2.25rem, 1.5rem + 3.2vw, 4rem)', { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '800' }],
        h2: ['clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.025em', fontWeight: '700' }],
        h3: ['clamp(1.2rem, 1.05rem + 0.6vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '700' }],
        lead: ['clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)', { lineHeight: '1.6' }],
      },
      borderRadius: { xl: '14px', '2xl': '20px', '3xl': '28px' },
      boxShadow: {
        card: '0 1px 2px rgba(5,11,20,.04), 0 8px 24px -12px rgba(5,11,20,.12)',
        lift: '0 2px 4px rgba(5,11,20,.06), 0 24px 48px -20px rgba(5,11,20,.28)',
        glow: '0 0 0 1px rgba(16,183,255,.35), 0 12px 40px -8px rgba(16,183,255,.35)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 70s linear infinite' },
    },
  },
  plugins: [],
};

export default config;
