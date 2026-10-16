import { z } from 'zod';
import { profile } from '@/data/portfolio';

export const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(100, 'Use 100 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.').max(255),
  details: z.string().trim().min(20, 'Please share at least 20 characters about your project.').max(2000, 'Use 2,000 characters or fewer.'),
  timeline: z.string().trim().min(1, 'Choose a timeline.').max(100),
  budget: z.string().trim().max(100),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export const emptyEnquiry: Enquiry = { name: '', email: '', details: '', timeline: '', budget: '' };
const deliveryError = 'Your enquiry could not be sent. Please try again or email me directly.';

export async function submitEnquiry(input: Enquiry) {
  const enquiry = enquirySchema.parse(input);
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT || `https://formsubmit.co/ajax/${profile.email}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: enquiry.name, email: enquiry.email, 'Project details': enquiry.details,
        Timeline: enquiry.timeline, Budget: enquiry.budget || 'Not specified',
        _subject: 'Portfolio — project enquiry', _template: 'table',
        _url: window.location.origin + window.location.pathname,
      }),
    });
    if (!response.ok) throw new Error(deliveryError);
    const result = await response.json();
    if (/activat|confirm.*email/i.test(String(result.message))) {
      throw new Error('The enquiry form is awaiting email confirmation. Please email me directly for now.');
    }
    if (result.success !== true && result.success !== 'true') throw new Error(deliveryError);
  } catch (error) {
    if (error instanceof Error && error.message.includes('awaiting email confirmation')) throw error;
    throw new Error(deliveryError);
  } finally {
    clearTimeout(timeout);
  }
}
