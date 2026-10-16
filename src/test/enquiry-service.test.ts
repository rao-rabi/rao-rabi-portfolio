import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { submitEnquiry } from '@/features/portfolio/enquiry';
const input = { name: 'Example Founder', email: 'founder@example.com', details: 'Build an operational dashboard for the team.', timeline: 'Exploring options', budget: 'USD 5,000' };
const request = vi.fn();
beforeEach(() => { vi.stubGlobal('fetch', request); request.mockReset(); vi.stubEnv('VITE_FORM_ENDPOINT', 'https://formsubmit.co/ajax/test-endpoint'); });
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
it('submits all enquiry details and accepts provider acknowledgement', async () => {
  request.mockResolvedValue({ ok: true, json: async () => ({ success: 'true', message: 'Success' }) });
  await submitEnquiry(input);
  const [endpoint, options] = request.mock.calls[0];
  expect(endpoint).toBe('https://formsubmit.co/ajax/test-endpoint');
  expect(JSON.parse(options.body)).toEqual(expect.objectContaining({ email: input.email, Timeline: input.timeline, Budget: 'USD 5,000', 'Project details': input.details }));
});
it('rejects invalid input without making a request', async () => {
  await expect(submitEnquiry({ ...input, email: 'invalid' })).rejects.toThrow();
  expect(request).not.toHaveBeenCalled();
});
it('handles provider rejection even when HTTP succeeds', async () => {
  request.mockResolvedValue({ ok: true, json: async () => ({ success: 'false' }) });
  await expect(submitEnquiry(input)).rejects.toThrow('could not be sent');
});
it('does not claim success while activation is required', async () => {
  request.mockResolvedValue({ ok: true, json: async () => ({ success: 'false', message: 'Please activate this form.' }) });
  await expect(submitEnquiry(input)).rejects.toThrow('awaiting email confirmation');
});
it('handles network and non-JSON service failures', async () => {
  request.mockRejectedValueOnce(new Error('Network failed'));
  await expect(submitEnquiry(input)).rejects.toThrow('could not be sent');
  request.mockResolvedValueOnce({ ok: true, json: async () => { throw new Error('Invalid JSON'); } });
  await expect(submitEnquiry(input)).rejects.toThrow('could not be sent');
});
it('handles unsuccessful HTTP responses', async () => {
  request.mockResolvedValue({ ok: false });
  await expect(submitEnquiry(input)).rejects.toThrow('could not be sent');
});
