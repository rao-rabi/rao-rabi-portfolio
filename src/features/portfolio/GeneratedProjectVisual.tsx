type VisualKind = 'transloom' | 'harmony' | 'donewise';

const labels: Record<VisualKind, { kicker: string; title: string; steps: string[] }> = {
  transloom: { kicker: 'LOCALISATION WORKFLOW', title: 'Codebase → review', steps: ['Scan source', 'Prepare languages', 'Open pull request'] },
  harmony: { kicker: 'CODE REVIEW WORKFLOW', title: 'Changes → clarity', steps: ['Analyse change', 'Suggest correction', 'Notify team'] },
  donewise: { kicker: 'WORK INTELLIGENCE', title: 'History → answers', steps: ['Read Git history', 'Draft work entry', 'Ask project questions'] },
};

export function GeneratedProjectVisual({ kind, thumbnail = false }: { kind: VisualKind; thumbnail?: boolean }) {
  const visual = labels[kind];
  return <figure className={`project-screenshot generated-visual generated-${kind}${thumbnail ? ' project-thumbnail' : ''}`}><div className="generated-shell" aria-label={`${visual.kicker.toLowerCase()} product visual`}><div className="generated-topbar"><span /><span /><span /></div><div className="generated-content"><p>{visual.kicker}</p><h3>{visual.title}</h3><ol>{visual.steps.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, '0')}</b><span>{step}</span><i /></li>)}</ol></div><div className="generated-side"><span /><span /><span /><span /></div></div></figure>;
}
