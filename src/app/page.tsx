import { pageMeta } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationLd, websiteLd } from '@/lib/jsonld';
import { Hero, LogoStrip, WhichCase, HubFeature, Journey, ProjectsShowcase, Network, Why, SwitchOperator, AppSection, Testimonials, PressSection, GuidesTeaser } from '@/components/sections/home';
import { FAQ } from '@/components/sections/FAQ';
import { FinalContact } from '@/components/sections/FinalContact';
import { faqs } from '@/data/faqs';

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
      <Journey />
      <ProjectsShowcase />
      <Network />
      <Why />
      <SwitchOperator />
      <AppSection />
      <Testimonials />
      <PressSection />
      <GuidesTeaser />
      <FAQ items={faqs.home} tone="light" />
      <FinalContact />
    </>
  );
}
