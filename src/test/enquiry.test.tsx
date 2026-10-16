import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EnquiryForm } from '@/features/portfolio/EnquiryForm';
import { submitEnquiry } from '@/features/portfolio/enquiry';

vi.mock('@/features/portfolio/enquiry', async importOriginal => ({
  ...await importOriginal<typeof import('@/features/portfolio/enquiry')>(),
  submitEnquiry: vi.fn(),
}));
const send = vi.mocked(submitEnquiry);
beforeEach(() => { send.mockReset(); });
afterEach(cleanup);
function fillEnquiry() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Example Founder' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'founder@example.com' } });
  fireEvent.change(screen.getByLabelText('Project details'), { target: { value: 'We need an internal scheduling tool for our team.' } });
  fireEvent.change(screen.getByLabelText('Timeline'), { target: { value: 'Within 1–3 months' } });
}
function submit() { fireEvent.click(screen.getByRole('button', { name: 'Discuss your project' })); }

describe('Project enquiry form', () => {
  it('validates required fields and invalid emails before sending', async () => {
    render(<EnquiryForm />);
    submit();
    expect(screen.getByText('Enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Choose a timeline.')).toBeInTheDocument();
    expect(send).not.toHaveBeenCalled();
    fillEnquiry();
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid' } });
    submit();
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
    expect(send).not.toHaveBeenCalled();
  });
  it('submits without an optional budget and confirms success', async () => {
    send.mockResolvedValue(undefined);
    render(<EnquiryForm />);
    fillEnquiry(); submit();
    expect(await screen.findByRole('status')).toHaveTextContent('your enquiry has been sent');
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ timeline: 'Within 1–3 months', budget: '' }));
    expect(screen.getByLabelText('Project details')).toHaveValue('');
  });
  it('preserves the enquiry on failure and allows a retry', async () => {
    send.mockRejectedValueOnce(new Error('Please email me directly.')).mockResolvedValueOnce(undefined);
    render(<EnquiryForm />);
    fillEnquiry(); submit();
    expect(await screen.findByRole('alert')).toHaveTextContent('Please email me directly.');
    expect(screen.getByLabelText('Project details')).toHaveValue('We need an internal scheduling tool for our team.');
    submit();
    expect(await screen.findByRole('status')).toHaveTextContent('your enquiry has been sent');
  });
  it('prevents duplicate submissions while sending', async () => {
    let resolve: () => void;
    send.mockImplementation(() => new Promise<void>(done => { resolve = done; }));
    render(<EnquiryForm />);
    fillEnquiry(); submit();
    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    expect(send).toHaveBeenCalledTimes(1);
    resolve!();
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('sent'));
  });
});
