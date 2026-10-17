import { useEffect, useState } from 'react';

const SECTION_OFFSET = 128;

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    let frame: number | null = null;
    function measureSections() {
      frame = null;
      let current = sectionIds[0] ?? '';
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= SECTION_OFFSET) current = id;
      }
      setActiveId(current);
    }
    function scheduleMeasurement() {
      if (frame === null) frame = window.requestAnimationFrame(measureSections);
    }
    measureSections();
    window.addEventListener('scroll', scheduleMeasurement, { passive: true });
    window.addEventListener('resize', scheduleMeasurement);
    window.addEventListener('hashchange', scheduleMeasurement);
    return () => {
      window.removeEventListener('scroll', scheduleMeasurement);
      window.removeEventListener('resize', scheduleMeasurement);
      window.removeEventListener('hashchange', scheduleMeasurement);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return activeId;
}
