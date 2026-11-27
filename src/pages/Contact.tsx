import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Copy, Mail, MapPin } from 'lucide-react';
import { SITE } from '../config/site';
import { buildEmailDraft, buildGmailCompose, buildMailto } from '../utils/mailto';

const fieldClass = 'w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2.5 text-gray-900 dark:text-gray-100';

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [handoff, setHandoff] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [showDraft, setShowDraft] = useState(false);
  const input = { to: SITE.email, ...fields };
  const draft = buildEmailDraft(input);
  const draftText = `To: ${SITE.email}\nSubject: ${draft.subject}\n\n${draft.body}`;

  const update = (key: keyof typeof fields, value: string) => {
    setFields(current => ({ ...current, [key]: value }));
    setHandoff(false);
    setCopyStatus('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    // Native validation covers email, limits, and consent; also reject whitespace-only text.
    if (!fields.name.trim() || !fields.message.trim() || !form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      setHandoff(false);
      setCopyStatus('Please enter your name, a valid email, and a message, and agree to the privacy notice.');
      return;
    }
    // Let the browser POST to FormSubmit. Do not fake success or clear the draft.
    setHandoff(true);
  };

  const copyDraft = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(draftText);
      setCopyStatus('Draft copied. Paste it into your email service to send it.');
      setShowDraft(false);
    } catch {
      setCopyStatus('Automatic copying is unavailable. Select and copy the draft below.');
      setShowDraft(true);
    }
  };

  return (
    <section className="site-container section-space" aria-labelledby="contact-heading">
      <p className="section-label mb-3">Contact</p>
      <h1 id="contact-heading" className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Let’s start a conversation.</h1>
      <p className="mt-5 max-w-2xl text-gray-600 dark:text-gray-400 leading-7">Have a question about a project or an opportunity to discuss? Send a short introduction and the details below.</p>
      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <aside className="text-sm text-gray-600 dark:text-gray-400 space-y-8" aria-label="Contact details">
          <div>
            <h2 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2"><Mail size={16} aria-hidden="true" /> Email directly</h2>
            <a href={`mailto:${SITE.email}`} className="text-link mt-3 break-all">{SITE.email}</a>
            <p className="mt-3 leading-6">Prefer your own email service? Use the address above, open a Gmail draft, or copy your message from this page.</p>
          </div>
          <div><h2 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> Location</h2><p className="mt-3">{SITE.location}</p><p className="mt-1">Western Indonesia Time (UTC+7)</p></div>
          <div><h2 className="font-medium text-gray-900 dark:text-gray-100">Elsewhere</h2><div className="mt-3 flex flex-wrap gap-5"><a className="text-link" href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a className="text-link" href={SITE.social.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></div>
        </aside>
        <div>
          <form action={`https://formsubmit.co/${SITE.email}`} method="POST" target="_blank" rel="noopener" onSubmit={handleSubmit} aria-label="Send a message" aria-describedby="contact-privacy contact-delivery" className="space-y-5 rounded-md border border-gray-200 dark:border-gray-700 p-5 sm:p-7">
            <input type="hidden" name="_subject" value="New portfolio enquiry — Raka Rendra Fayanto" />
            <input type="hidden" name="_template" value="table" />
            <div hidden aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" type="text" name="_honey" tabIndex={-1} autoComplete="off" /></div>
            <div><label htmlFor="contact-name" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Name</label><input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={120} value={fields.name} onChange={e => update('name', e.target.value)} className={fieldClass} placeholder="Your name" /></div>
            <div><label htmlFor="contact-email" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={e => update('email', e.target.value)} className={fieldClass} placeholder="you@example.com" /></div>
            <div><label htmlFor="contact-message" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Message</label><textarea id="contact-message" name="message" required maxLength={5000} rows={7} value={fields.message} onChange={e => update('message', e.target.value)} className={`${fieldClass} resize-y`} placeholder="What would you like to discuss?" /></div>
            <p id="contact-privacy" className="text-xs leading-6 text-gray-500 dark:text-gray-400">This form uses FormSubmit to process your name, email, and message and forward them to my inbox. Do not include passwords or sensitive information. <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">FormSubmit privacy policy</a>.</p>
            <label className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-gray-400"><input type="checkbox" name="consent" value="accepted" required className="mt-1 h-4 w-4 shrink-0 accent-blue-700" />I agree to share these details with FormSubmit to send this message.</label>
            <button type="submit" className="button-primary w-full">Continue to send message <ArrowUpRight size={16} aria-hidden="true" /></button>
            <p id="contact-delivery" className="text-xs leading-6 text-gray-500 dark:text-gray-400">Opens FormSubmit in a new tab to complete verification. Delivery requires the recipient’s one-time email activation. This page cannot confirm inbox delivery; you can always use email directly instead.</p>
            {handoff && <p role="status" className="text-sm leading-6 text-blue-700 dark:text-blue-300">Continue in the FormSubmit tab and complete its verification step. Your draft is still here. Opening that page does not confirm your message has been delivered.</p>}
          </form>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-6">
            <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">Other ways to send this draft</h2>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <a href={buildGmailCompose(input)} target="_blank" rel="noopener noreferrer" className="text-link">Open in Gmail ↗</a>
              <a href={buildMailto(input)} className="text-link">Use email app ↗</a>
              <button type="button" onClick={copyDraft} className="text-link"><Copy size={14} aria-hidden="true" /> Copy draft</button>
            </div>
            <p className="text-xs leading-6 text-gray-500 dark:text-gray-400 mt-3">Gmail requires sign-in. These options only prepare a draft; you still need to send it.</p>
            {copyStatus && <p role="status" className="text-sm leading-6 mt-3 text-gray-700 dark:text-gray-300">{copyStatus}</p>}
            {showDraft && <div className="mt-4"><label htmlFor="manual-draft" className="text-sm text-gray-700 dark:text-gray-300">Select and copy your draft</label><textarea id="manual-draft" readOnly value={draftText} rows={9} onFocus={event => event.currentTarget.select()} className={`${fieldClass} mt-2 text-sm`} /></div>}
          </div>
        </div>
      </div>
    </section>
  );
}
