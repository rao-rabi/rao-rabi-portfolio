import trailerImage from '@/assets/3d-trailer-builder.webp';
import upthymeImage from '@/assets/upthyme-product.webp';
import athloImage from '@/assets/athlo.webp';
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
  configurator: { name: 'Interactive Food Trailer Configurator', src: trailerImage, alt: 'Interactive food trailer configurator product visual' },
  workforce: { name: 'Workforce Operations Suite', src: upthymeImage, alt: 'Workforce scheduling, payroll, and team operations product visual' },
  sports: { name: 'Sports Community App', src: athloImage, alt: 'Mobile sports community app product visual' },
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
  if (kind === 'harmony') return <GeneratedProjectVisual kind="harmony" thumbnail={thumbnail} />;
  const image = projectImages[kind];
  if (!image) return null;
  const maskNames = ['workforce', 'sports', 'configurator'].includes(kind);
  return (
    <figure className={`project-screenshot${thumbnail ? ' project-thumbnail' : ''} screenshot-${image.name.toLowerCase().replace(/ /g, '-')}${maskNames ? ` name-masked mask-${kind}` : ''}`}>
      <img src={image.src} alt={image.alt} loading="lazy" />
      {maskNames && <><span className="name-mask name-mask-title" aria-hidden="true" /><span className="name-mask name-mask-ui" aria-hidden="true" /></>}
    </figure>
  );
}
