import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { SITE } from '../config/site';
import { buildMailto } from '../utils/mailto';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const sectionRef = useReveal<HTMLElement>();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    window.location.href = buildMailto({
      to: SITE.email,
      name,
      email,
      message,
    });
    setSent(true);
    form.reset();
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Tertarik untuk berkolaborasi atau punya pertanyaan? Jangan ragu untuk menghubungi saya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 reveal">
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors text-sm break-all"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {SITE.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Social Media</h3>
              <div className="flex gap-3">
                <a href={SITE.social.github} target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-3 rounded-xl bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105">
                  <Github className="h-5 w-5" />
                </a>
                {SITE.social.linkedin && (
                  <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="p-3 rounded-xl bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-200 hover:scale-105">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal" style={{ transitionDelay: '200ms' }}>
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                  placeholder="Tulis pesan kamu di sini..."
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]"
              >
                <Send className="h-4 w-4" />
                Kirim Pesan
              </button>

              {sent && (
                <p
                  role="status"
                  className="flex items-start gap-2 text-sm text-green-600 dark:text-green-400"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Aplikasi email kamu sedang dibuka dengan pesan yang sudah terisi.
                  Kalau tidak terbuka, kirim manual ke{' '}
                  <a href={`mailto:${SITE.email}`} className="underline">
                    {SITE.email}
                  </a>
                  .
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
