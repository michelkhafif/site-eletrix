import { pageMeta } from '@/lib/seo';
import { CityPage } from '@/components/sections/CityPage';
import { cityBySlug } from '@/data/cities';

const city = cityBySlug('rio-de-janeiro');
export const metadata = pageMeta(city.path);

export default function Page() {
  return <CityPage city={city} />;
}
