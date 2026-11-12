import dashboardImage from '@/assets/donewise-dashboard.webp';
import timelineImage from '@/assets/donewise-timeline.webp';
import askImage from '@/assets/donewise-ask.webp';

const screenshots = [
  { src: dashboardImage, alt: 'Donewise project dashboard with recorded work and project summaries', caption: 'Project dashboard' },
  { src: timelineImage, alt: 'Donewise timeline showing work grouped by month with request, type, status, and date', caption: 'Work timeline' },
  { src: askImage, alt: 'Donewise Ask screen for querying past project work', caption: 'Ask about past work' },
];

export function DonewiseScreenshots() {
  return <div className="donewise-screenshots">{screenshots.map(({ src, alt, caption }) => <figure key={caption}><img src={src} alt={alt} loading="lazy" /><figcaption>{caption}</figcaption></figure>)}</div>;
}
