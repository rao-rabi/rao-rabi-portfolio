import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useActiveSection } from '@/features/portfolio/useActiveSection';

const ids = ['problem', 'role', 'results'];
let positions: Record<string, number>;
let frames: Map<number, FrameRequestCallback>;
let nextFrame: number;
let fixture: HTMLDivElement;

beforeEach(() => {
  positions = { problem: 300, role: 700, results: 1400 };
  frames = new Map(); nextFrame = 0;
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    frames.set(++nextFrame, callback); return nextFrame;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => { frames.delete(id); });
  fixture = document.createElement('div');
  ids.forEach(id => {
    const element = document.createElement('section'); element.id = id;
    vi.spyOn(element, 'getBoundingClientRect').mockImplementation(() => ({ top: positions[id] } as DOMRect));
    fixture.append(element);
  });
  document.body.append(fixture);
});
afterEach(() => { cleanup(); fixture.remove(); vi.restoreAllMocks(); });

function updateViewport(event: 'scroll' | 'resize' = 'scroll') {
  act(() => {
    window.dispatchEvent(new Event(event));
    const pending = [...frames.values()]; frames.clear();
    pending.forEach(callback => callback(0));
  });
}

describe('useActiveSection', () => {
  it('tracks the section at the reading position in both scroll directions', () => {
    const { result } = renderHook(() => useActiveSection(ids));
    expect(result.current).toBe('problem');
    positions = { problem: -400, role: 110, results: 800 };
    updateViewport(); expect(result.current).toBe('role');
    positions = { problem: -1100, role: -500, results: 100 };
    updateViewport(); expect(result.current).toBe('results');
    positions = { problem: 100, role: 600, results: 1300 };
    updateViewport(); expect(result.current).toBe('problem');
  });
  it('handles direct jumps and recalculates after viewport changes', () => {
    positions = { problem: -1100, role: -500, results: 100 };
    const { result } = renderHook(() => useActiveSection(ids));
    expect(result.current).toBe('results');
    positions.results = 350;
    updateViewport('resize'); expect(result.current).toBe('role');
  });
  it('tolerates missing sections and an empty navigation', () => {
    document.getElementById('role')?.remove();
    const { result } = renderHook(() => useActiveSection(ids));
    updateViewport(); expect(result.current).toBe('problem');
    const emptyIds: string[] = [];
    const { result: empty } = renderHook(() => useActiveSection(emptyIds));
    expect(empty.current).toBe('');
  });
  it('batches scroll work and cancels pending work when unmounted', () => {
    const { unmount } = renderHook(() => useActiveSection(ids));
    act(() => { window.dispatchEvent(new Event('scroll')); window.dispatchEvent(new Event('scroll')); });
    expect(frames.size).toBe(1);
    unmount(); expect(frames.size).toBe(0);
    window.dispatchEvent(new Event('scroll'));
    expect(frames.size).toBe(0);
  });
});
