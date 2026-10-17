const deliverySteps: Record<string, string[]> = {
  upthyme: [
    'Planning: scheduling and PTO cover planned shifts and time away. Timesheets record the time worked.',
    'Operations: jobs, tasks, forms, documents, and reviews extend the product beyond the schedule.',
    'Administration and communication: payroll, organisation management, and team chat complete the confirmed delivery scope.',
  ],
  athlo: [
    'The React Native application provides the mobile experience; Python and Django provide the backend I built for it.',
    'Discovery and participation include pickup games, team coordination, coaching, and event tickets.',
    'News, community, and sports AI features bring the player, organiser, and fan experiences into the same product.',
  ],
  propertyfy: [
    'Start at the portfolio dashboard to review rented, sold, and available properties.',
    'Open the operational records to review the property and its tenant or buyer information.',
    'Follow the financial records through the associated invoices, payments, and documented transfers.',
  ],
  'digital-parchi': [
    'Use the React Native application as the smartphone-based point of sale.',
    'Work with digital inventory and billing in the same retail ERP, backed by Django.',
    'Connect the mobile billing workflow with Bluetooth billing and physical documentation.',
  ],
};

export function DeliveryWalkthrough({ slug }: { slug: string }) {
  const steps = deliverySteps[slug];
  if (!steps) return null;
  return (
    <div className="delivery-evidence">
      <h3>The delivered product, step by step</h3>
      <ol>{steps.map(step => <li key={step}>{step}</li>)}</ol>
    </div>
  );
}
