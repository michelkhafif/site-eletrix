import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationLd, websiteLd } from '@/lib/jsonld';
import { BASE_PATH } from '@/config/site';
import { Hero, LogoStrip } from '@/components/sections/home';
import { WhichCase, HubFeature, Journey, Stations, Why, SwitchOperator, AppSection, Testimonials, PressSection, HomeDuvidas } from '@/components/sections/HomeSections';
import { FinalContact } from '@/components/sections/FinalContact';

export const metadata = pageMeta('/');

/** Âncoras do site anterior que ainda circulam em links: cada uma leva ao lugar novo. */
const oldAnchors: Record<string, string> = {
  '#solutions': '#solucoes', '#portfolio': '#estacoes', '#cases': '#depoimentos', '#faq': '#duvidas',
  '#media': '/imprensa/', '#partners': '/parceiros/', '#sobre': '/sobre/',
};
const legacyHashes = `(function(){var t=${JSON.stringify(oldAnchors)}[location.hash];if(t)location.replace(t.charAt(0)==='#'?t:${JSON.stringify(BASE_PATH)}+t)})()`;

export default function Home() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <JsonLd data={websiteLd()} />
      <Hero />
      <LogoStrip />
      <WhichCase />
      <HubFeature />
      <AppSection />
      <Journey />
      <Stations />
      <Why />
      <SwitchOperator />
      <Testimonials />
      <PressSection />
      <HomeDuvidas />
      <FinalContact />
      <script dangerouslySetInnerHTML={{ __html: legacyHashes }} />
    </>
  );
}
