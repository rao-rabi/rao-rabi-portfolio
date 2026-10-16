import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AutomationVisual } from './AutomationVisual';

export function Automation() {
  return (
    <section className="automation">
      <div className="section automation-feature">
        <div>
          <p className="eyebrow">A REAL WORKFLOW / DENTAL CLINIC</p>
          <h2>From a booking request<br />to a confirmed appointment.</h2>
          <p>I built an n8n workflow connecting calls and chat to Google Calendar, then notifying the doctor and patient through WhatsApp.</p>
          <p><strong>Standard automation:</strong> calendar booking and WhatsApp notifications.</p>
          <p><strong>AI scope:</strong> AI attends calls and replies to customers. n8n orchestrates the calendar booking and notifications.</p>
          <Link className="text-link" to="/work/dental-clinic">View case study <ArrowRight size={18} /></Link>
        </div>
        <AutomationVisual clinic />
      </div>
    </section>
  );
}
