import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useEnteredViewport } from '@/features/portfolio/useEnteredViewport';

function Fixture() {
  const { ref, entered } = useEnteredViewport();
  return <a ref={ref} href="/projects" data-entered={entered}>Projects</a>;
}

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('useEnteredViewport', () => {
  it('starts only on entry and stops observing after the first reveal', () => {
    let callback: IntersectionObserverCallback;
    const disconnect = vi.fn();
    const observe = vi.fn();
    vi.stubGlobal('IntersectionObserver', vi.fn(function (handler: IntersectionObserverCallback) {
      callback = handler;
      return { observe, disconnect };
    }));
    const { unmount } = render(<Fixture />);
    const link = screen.getByRole('link');
    expect(observe).toHaveBeenCalledWith(link);
    act(() => callback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(link).toHaveAttribute('data-entered', 'false');
    act(() => callback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(link).toHaveAttribute('data-entered', 'true');
    expect(disconnect).toHaveBeenCalledTimes(1);
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(2);
  });

  it('keeps the link available when visibility observation is unsupported', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<Fixture />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/projects');
  });
});
