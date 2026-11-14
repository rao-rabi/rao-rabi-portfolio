type VisualKind = 'workforce' | 'sports' | 'configurator' | 'harmony';

const labels: Record<VisualKind, { kicker: string; title: string; steps: string[] }> = {
  workforce: { kicker: 'TEAM OPERATIONS', title: 'Schedule & payroll', steps: ['Plan shifts', 'Record time', 'Run payroll'] },
  sports: { kicker: 'SPORTS COMMUNITY', title: 'Games & connection', steps: ['Find a game', 'Coordinate a team', 'Follow the action'] },
  configurator: { kicker: '3D PRODUCT BUILDER', title: 'Configure a trailer', steps: ['Choose a trailer type', 'Build the layout', 'Review the configuration'] },
  harmony: { kicker: 'CODE REVIEW WORKFLOW', title: 'Changes → clarity', steps: ['Analyse change', 'Suggest correction', 'Notify team'] },
};

export function GeneratedProjectVisual({ kind, thumbnail = false }: { kind: VisualKind; thumbnail?: boolean }) {
  const visual = labels[kind];
  return <figure className={`project-screenshot generated-visual generated-${kind}${thumbnail ? ' project-thumbnail' : ''}`}><div className="generated-shell" aria-label={`${visual.kicker.toLowerCase()} product visual`}><div className="generated-topbar"><span /><span /><span /></div><div className="generated-content"><p>{visual.kicker}</p><h3>{visual.title}</h3><ol>{visual.steps.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, '0')}</b><span>{step}</span><i /></li>)}</ol></div><div className="generated-side"><span /><span /><span /><span /></div></div></figure>;
}
