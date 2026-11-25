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
export function buildMailto({
  to,
  name,
  email,
  message,
  subjectPrefix = 'Portfolio Contact from',
}: MailtoInput): string {
  const subject = encodeURIComponent(`${subjectPrefix} ${name}`.trim());
  const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
