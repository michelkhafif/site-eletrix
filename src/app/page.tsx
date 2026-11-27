import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationLd, websiteLd } from '@/lib/jsonld';
import { Hero, LogoStrip } from '@/components/sections/home';
import { WhichCase, HubFeature, Journey, Stations, Why, SwitchOperator, AppSection, Testimonials, PressSection, HomeDuvidas } from '@/components/sections/HomeSections';
import { FinalContact } from '@/components/sections/FinalContact';

export const metadata = pageMeta('/');

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
    </>
  );
}
