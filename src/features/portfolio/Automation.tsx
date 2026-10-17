import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AutomationVisual } from './AutomationVisual';

export function Automation() {
  return (
    <section className="automation">
      <div className="section automation-feature">
        <div>
          <p className="eyebrow">HOW THE AUTOMATION WORKS</p>
          <h2>Conversation is AI.<br />The booking is automation.</h2>
          <p>In the dental clinic project, AI attends calls and replies to customers. n8n connects that conversation to the actions needed to complete a booking.</p>
          <p><strong>The booking record:</strong> the appointment is added to Google Calendar through standard automation.</p>
          <p><strong>The confirmation:</strong> WhatsApp messages inform both the doctor and the patient about the booking.</p>
          <Link className="text-link" to="/work/dental-clinic">View case study <ArrowRight size={18} /></Link>
        </div>
        <AutomationVisual clinic />
      </div>
    </section>
  );
}
