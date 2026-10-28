import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { emptyEnquiry, enquirySchema, submitEnquiry } from './enquiry';
import type { Enquiry } from './enquiry';

type Errors = Partial<Record<keyof Enquiry, string>>;
export function EnquiryForm({ projectName }: { projectName?: string }) {
  const [form, setForm] = useState(() => ({
    ...emptyEnquiry,
    details: projectName ? `I’m interested in something like ${projectName}.\n\n` : '',
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: keyof Enquiry, value: string) {
    setForm(current => ({ ...current, [field]: value }));
    if (state !== 'sending') setState('idle');
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (state === 'sending') return;
    const result = enquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Errors = {};
      result.error.issues.forEach(issue => { fieldErrors[issue.path[0] as keyof Enquiry] = issue.message; });
      setErrors(fieldErrors);
      setState('idle');
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setErrors({});
    setState('sending');
    try {
      await submitEnquiry(result.data);
      setForm({ ...emptyEnquiry });
      setMessage('Thanks — your enquiry has been sent.');
      setState('success');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Your enquiry could not be sent. Please try again or email me directly.');
      setState('error');
    }
  }
  function fieldProps(field: keyof Enquiry) {
    const labels = { name: 'Name', email: 'Email', details: 'Project details', timeline: 'Timeline', budget: 'Budget (optional)' };
    return { id: `enquiry-${field}`, name: field, value: form[field], 'aria-label': labels[field],
      'aria-invalid': !!errors[field], 'aria-describedby': errors[field] ? `${field}-error` : undefined,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(field, event.target.value) };
  }
  return (
    <form ref={formRef} className="enquiry-form" onSubmit={handleSubmit} noValidate aria-label="Project enquiry" aria-busy={state === 'sending'}>
      <h3>Tell me about your project</h3>
      {projectName && <p className="enquiry-context">Inspired by {projectName}? Edit the message below to tell me what you need.</p>}
      <fieldset disabled={state === 'sending'}>
        <div className="form-pair">
          <label htmlFor="enquiry-name">Name<input {...fieldProps('name')} autoComplete="name" required maxLength={100} />{errors.name && <span id="name-error" className="field-error">{errors.name}</span>}</label>
          <label htmlFor="enquiry-email">Email<input {...fieldProps('email')} type="email" autoComplete="email" required maxLength={255} />{errors.email && <span id="email-error" className="field-error">{errors.email}</span>}</label>
        </div>
        <label htmlFor="enquiry-details">Project details<textarea {...fieldProps('details')} required rows={4} maxLength={2000} placeholder="What would you like to build or automate?" />{errors.details && <span id="details-error" className="field-error">{errors.details}</span>}</label>
        <div className="form-pair">
          <label htmlFor="enquiry-timeline">Timeline<select {...fieldProps('timeline')} required><option value="">Choose a timeline</option><option>As soon as possible</option><option>Within 1–3 months</option><option>3+ months</option><option>Exploring options</option></select>{errors.timeline && <span id="timeline-error" className="field-error">{errors.timeline}</span>}</label>
          <label htmlFor="enquiry-budget">Budget <span className="optional">(optional)</span><input {...fieldProps('budget')} maxLength={100} placeholder="Range and currency" />{errors.budget && <span id="budget-error" className="field-error">{errors.budget}</span>}</label>
        </div>
        <button className="button primary" type="submit">{state === 'sending' ? 'Sending…' : 'Discuss your project'}<ArrowRight size={18} /></button>
      </fieldset>
      <p className="form-privacy">Your details are emailed to Rao Rabi via FormSubmit to respond to this enquiry.</p>
      {state === 'success' && <p className="form-success" role="status">{message}</p>}
      {state === 'error' && <p className="field-error" role="alert">{message}</p>}
    </form>
  );
}
