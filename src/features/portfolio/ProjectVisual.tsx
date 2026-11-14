import grammarImage from '@/assets/grammar-guru.webp';
import decodedImage from '@/assets/decoded-skin.webp';
import buddyImage from '@/assets/talkative-buddy.webp';
import maardhcumImage from '@/assets/maarhdcum.webp';
import rapidImage from '@/assets/rapid.webp';
import dentalImage from '@/assets/dental.webp';
import parchiImage from '@/assets/parchi.webp';
import propertyImage from '@/assets/propertyfy.webp';
import transloomImage from '@/assets/transloom.webp';
import donewiseImage from '@/assets/donewise.webp';
import { GeneratedProjectVisual } from './GeneratedProjectVisual';

const projectImages: Record<string, { name: string; src: string; alt: string }> = {
  dark: { name: 'RapidShips', src: rapidImage, alt: 'RapidShips quote, work-order and invoicing workflow illustration' },
  cream: { name: 'Dental Clinic', src: dentalImage, alt: 'Dental Clinic call, chat and calendar booking illustration' },
  retail: { name: 'Digital Parchi', src: parchiImage, alt: 'Digital Parchi mobile retail billing and inventory illustration' },
  property: { name: 'PropertyFy', src: propertyImage, alt: 'PropertyFy portfolio, tenant and financial management concept interface' },
  grammar: { name: 'Grammar Guru', src: grammarImage, alt: 'Grammar Guru writing tool product visual' },
  skincare: { name: 'Decoded Skin', src: decodedImage, alt: 'Decoded Skin website and mobile product visual' },
  buddy: { name: 'Talkative Buddy', src: buddyImage, alt: 'Talkative Buddy website assistant product visual' },
  marketplace: { name: 'Maardhcum', src: maardhcumImage, alt: 'Maardhcum automotive marketplace product visual' },
  transloom: { name: 'TransLoom', src: transloomImage, alt: 'TransLoom product page showing its i18n workflow and dashboard' },
  donewise: { name: 'Donewise', src: donewiseImage, alt: 'Donewise dashboard, work timeline, and AI question screens' },
};
export function ProjectVisual({ kind, thumbnail = false }: { kind: string; thumbnail?: boolean }) {
  if (['workforce', 'sports', 'configurator', 'harmony'].includes(kind)) return <GeneratedProjectVisual kind={kind as 'workforce' | 'sports' | 'configurator' | 'harmony'} thumbnail={thumbnail} />;
  const image = projectImages[kind];
  if (!image) return null;
  return (
    <figure className={`project-screenshot${thumbnail ? ' project-thumbnail' : ''} screenshot-${image.name.toLowerCase().replace(/ /g, '-')}`}>
      <img src={image.src} alt={image.alt} loading="lazy" />
    </figure>
  );
}
