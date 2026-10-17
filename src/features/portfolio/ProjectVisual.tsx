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

const projectImages: Record<string, { name: string; src: string; alt: string }> = {
  dark: { name: 'RapidShips', src: rapidImage, alt: 'RapidShips quote, work-order and invoicing workflow illustration' },
  cream: { name: 'Dental Clinic', src: dentalImage, alt: 'Dental Clinic call, chat and calendar booking illustration' },
  retail: { name: 'Digital Parchi', src: parchiImage, alt: 'Digital Parchi mobile retail billing and inventory illustration' },
  property: { name: 'PropertyFy', src: propertyImage, alt: 'PropertyFy portfolio, tenant and financial management concept interface' },
  blue: { name: 'UpThyme', src: upthymeImage, alt: 'UpThyme scheduling and payroll product visual' },
  mobile: { name: 'Athlo', src: athloImage, alt: 'Updated Athlo mobile sports app product visual' },
  grammar: { name: 'Grammar Guru', src: grammarImage, alt: 'Grammar Guru writing tool product visual' },
  skincare: { name: 'Decoded Skin', src: decodedImage, alt: 'Decoded Skin website and mobile product visual' },
  buddy: { name: 'Talkative Buddy', src: buddyImage, alt: 'Talkative Buddy website assistant product visual' },
  marketplace: { name: 'Maardhcum', src: maardhcumImage, alt: 'Maardhcum automotive marketplace product visual' },
};
export function ProjectVisual({ kind, thumbnail = false }: { kind: string; thumbnail?: boolean }) {
  const image = projectImages[kind];
  if (!image) return null;
  return (
    <figure className={`project-screenshot${thumbnail ? ' project-thumbnail' : ''} screenshot-${image.name.toLowerCase().replace(/ /g, '-')}`}>
      <img src={image.src} alt={`${image.alt} — concept illustration`} loading="lazy" />
    </figure>
  );
}
