import { ArrowDown, CalendarDays, FileCheck2, FileSpreadsheet, MessageCircle, Phone, ReceiptText, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Step = { icon: LucideIcon; title: string; detail: string; type: string };

const operations: Step[] = [
  { icon: MessageCircle, title: 'Custom quote intake', detail: 'Customer + job details', type: 'AI task not yet confirmed' },
  { icon: FileCheck2, title: 'Work orders', detail: 'Connected operational records', type: 'Standard automation' },
  { icon: FileSpreadsheet, title: 'Spreadsheet updates', detail: 'Records updated as work progresses', type: 'Standard automation' },
  { icon: ReceiptText, title: 'QuickBooks invoicing', detail: 'From completed work orders', type: 'Standard automation' },
];
const appointments: Step[] = [
  { icon: Phone, title: 'AI call & chat handling', detail: 'Attend calls and reply to customers', type: 'AI conversation' },
  { icon: CalendarDays, title: 'Google Calendar', detail: 'Appointment booking', type: 'Standard automation' },
  { icon: MessageCircle, title: 'WhatsApp notifications', detail: 'Doctor + patient informed', type: 'Standard automation' },
];

export function AutomationVisual({ clinic }: { clinic: boolean }) {
  const steps = clinic ? appointments : operations;
  return (
    <figure className={`automation-visual ${clinic ? 'automation-clinic' : 'automation-logistics'}`}>
      <div className="workflow-heading">
        <span><Workflow size={17} /> n8n / {clinic ? 'APPOINTMENT BOOKING' : 'CONNECTED OPERATIONS'}</span>
        <i aria-hidden="true" />
      </div>
      <ol className="workflow-nodes">
        {steps.map(({ icon: Icon, title, detail, type }, index) => (
          <li key={title}>
            {index > 0 && <ArrowDown className="workflow-connector" size={17} aria-hidden="true" />}
            <div className="workflow-node">
              <span className="workflow-icon"><Icon size={20} aria-hidden="true" /></span>
              <div><strong>{title}</strong><p>{detail}</p><small className="workflow-type">{type}</small></div>
              <span className="workflow-index">0{index + 1}</span>
            </div>
          </li>
        ))}
      </ol>
      <figcaption>Workflow illustration · based on confirmed project scope</figcaption>
    </figure>
  );
}
