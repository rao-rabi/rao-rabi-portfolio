const enquiry = encodeURIComponent('Hi Rao, I’d like to discuss a project with you.');

export function WhatsAppContact() {
  return (
    <a
      className="whatsapp-contact"
      href={`https://wa.me/923048348165?text=${enquiry}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuss your project with Rao on WhatsApp (opens in a new tab)"
    >
      <svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.2-4.7A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="m8.2 7.3 1.4 2-1 1.1c.8 1.7 2.1 3 3.9 3.8l1-1 2.2 1.3c.2.2.2.5.1.8-.5 1.1-1.4 1.5-2.5 1.2-3.7-1-6.4-3.8-7.1-6.8-.2-.9.2-1.9 1.1-2.5.4-.2.7-.2.9.1Z" />
      </svg>
      <span>Let’s chat<span className="whatsapp-contact-label">on WhatsApp</span></span>
    </a>
  );
}
