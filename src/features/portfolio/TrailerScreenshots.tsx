import coldTrailer from '@/assets/trailer-cold-trailer.webp';
import hotTrailer from '@/assets/trailer-hot-trailer.webp';
import equipment from '@/assets/trailer-equipment-selection.webp';

const screenshots = [
  { src: coldTrailer, caption: 'Cold trailer selection with the 3D exterior and configuration controls.' },
  { src: hotTrailer, caption: 'Hot trailer selected, with the serving window and exterior equipment visible.' },
  { src: equipment, caption: 'Equipment selection in the layout editor, including refrigeration options.' },
];

export function TrailerScreenshots() {
  return <div className="trailer-screenshots">{screenshots.map(({ src, caption }) => (
    <figure key={src}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open screenshot: ${caption}`}>
        <img src={src} alt={caption} width={1920} height={891} loading="lazy" />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  ))}</div>;
}
