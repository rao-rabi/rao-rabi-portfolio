import { useEffect, useRef, useState } from 'react';

export function useEnteredViewport() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window.IntersectionObserver !== 'function') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, entered };
}
