export interface MailtoInput {
  to: string;
  name: string;
  email: string;
  message: string;
  subjectPrefix?: string;
}

/**
 * Builds a `mailto:` URL with a properly encoded subject and body.
 * Every dynamic part is URI-encoded so names/messages containing
 * `&`, `#`, `?`, or newlines cannot break the URL.
 */
export function buildMailto(input: MailtoInput): string {
  const draft = buildEmailDraft(input);
  return `mailto:${input.to}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
}

/** Shared content for mailto, Gmail, and copying. None of these helpers sends mail. */
export function buildEmailDraft({ name, email, message, subjectPrefix = 'Portfolio Contact from' }: MailtoInput) {
  return {
    subject: `${subjectPrefix} ${name}`.trim(),
    body: `From: ${name} (${email})\n\n${message}`,
  };
}

export function buildGmailCompose(input: MailtoInput): string {
  const { subject, body } = buildEmailDraft(input);
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: input.to, su: subject, body });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
