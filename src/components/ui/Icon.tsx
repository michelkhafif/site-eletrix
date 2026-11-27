import {
  ArrowRight, ArrowUpRight, BadgeCheck, Building2, CalendarCheck, Check, ChevronDown, Clock, Cable, FileText, Gauge, Handshake,
  Headset, Home, KeyRound, Layers, Leaf, LineChart, MapPin, Menu, Plug, Phone, Route, Scale, ShieldCheck, SlidersHorizontal,
  Smartphone, Sparkles, X, Zap, Wrench, Mail, Pause, Play, Info, AlertTriangle, ClipboardCheck, Network, Lock,
  RefreshCw, Palette, Receipt, Ruler, BatteryCharging, Car, Search, Star, Download,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { WhatsAppGlyph } from './WhatsAppGlyph';

const icons = {
  arrowRight: ArrowRight, arrowUpRight: ArrowUpRight, badge: BadgeCheck, building: Building2, calendar: CalendarCheck, check: Check,
  chevronDown: ChevronDown, clock: Clock, cable: Cable, file: FileText, gauge: Gauge, handshake: Handshake, headset: Headset, home: Home,
  key: KeyRound, layers: Layers, leaf: Leaf, chart: LineChart, pin: MapPin, menu: Menu, plug: Plug, phone: Phone,
  route: Route, scale: Scale, shield: ShieldCheck, sliders: SlidersHorizontal, phoneApp: Smartphone, sparkles: Sparkles, close: X,
  zap: Zap, wrench: Wrench, mail: Mail, pause: Pause, play: Play, info: Info,
  alert: AlertTriangle, clipboard: ClipboardCheck, network: Network, lock: Lock, refresh: RefreshCw, palette: Palette,
  receipt: Receipt, ruler: Ruler, charge: BatteryCharging, car: Car, search: Search, star: Star, download: Download,
} as const;

const brandPaths = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <path d="M7 10v7M7 7v.01M11 17v-7M11 13a3 3 0 0 1 6 0v4" />
      <rect x="3" y="3" width="18" height="18" rx="3" />
    </>
  ),
} as const;

export type IconName = keyof typeof icons | keyof typeof brandPaths | 'whatsapp';

export function Icon({ name, size = 20, strokeWidth = 1.6, ...rest }: { name: IconName } & LucideProps) {
  if (name === 'whatsapp') return <WhatsAppGlyph size={Number(size)} className={rest.className} />;
  if (name === 'instagram' || name === 'linkedin') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={rest.className}>
        {brandPaths[name]}
      </svg>
    );
  }
  const C = icons[name];
  return <C size={size} strokeWidth={strokeWidth} aria-hidden="true" focusable="false" {...rest} />;
}
