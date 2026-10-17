import { useEffect } from 'react';
const origin = 'https://rao-rabi-portfolio.vercel.app';
export function PageMeta({ title, description, path }: { title: string; description: string; path: string }) {
  useEffect(() => {
    document.title = title;
    const values = { description, 'og:title': title, 'og:description': description, 'og:url': origin + path,
      'og:image': origin + '/social-preview.png', 'twitter:title': title, 'twitter:description': description,
      'twitter:image': origin + '/social-preview.png' };
    Object.entries(values).forEach(([name, content]) => {
      const attribute = name.startsWith('og:') ? 'property' : 'name';
      let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, name); document.head.append(element); }
      element.content = content;
    });
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', origin + path);
    const anchor = document.getElementById(window.location.hash.slice(1));
    if (anchor) anchor.scrollIntoView();
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [title, description, path]);
  return null;
}
