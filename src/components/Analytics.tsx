import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config/site';
import { getPageTitle } from '../hooks/usePageTitle';

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'portfolio-analytics-consent';

function readConsent(): string | null {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

/** GA4 stays unloaded until the visitor opts in. No contact-form data is sent. */
export default function Analytics() {
  const { pathname, search } = useLocation();
  const [consent, setConsent] = useState(readConsent);
  const lastPage = useRef<string | null>(null);
  const id: string = SITE.analyticsId;
  const enabled = /^G-[A-Z0-9]+$/.test(id);

  useEffect(() => {
    if (!enabled || consent !== 'accepted') return;
    if (!document.getElementById('portfolio-ga4')) {
      window.dataLayer = window.dataLayer || [];
      // Google's command queue expects an Arguments object, not a plain array.
      // eslint-disable-next-line prefer-rest-params
      window.gtag = function () { window.dataLayer?.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
      const script = document.createElement('script');
      script.id = 'portfolio-ga4';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(script);
    }
    // HashRouter URLs need explicit route-level page views, not automatic history events.
    const page = pathname + search;
    if (lastPage.current === page) return;
    lastPage.current = page;
    window.gtag?.('event', 'page_view', {
      page_location: `${SITE.siteUrl}/#${pathname}${search}`,
      page_path: pathname + search,
      page_title: getPageTitle(pathname),
    });
  }, [enabled, id, consent, pathname, search]);

  const choose = (value: string) => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch { /* in-memory choice still works */ }
    setConsent(value);
  };

  if (!enabled) return null;
  if (consent === 'accepted' || consent === 'declined') {
    return <div className="print:hidden text-center py-3 text-sm"><button type="button" className="underline text-gray-600 dark:text-gray-400" onClick={() => { choose(''); window.location.reload(); }}>Pengaturan analytics</button></div>;
  }
  return (
    <aside aria-label="Persetujuan analytics" className="print:hidden bg-blue-50 dark:bg-gray-800 border-t border-blue-200 dark:border-gray-700 p-5">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-4">
        <p className="flex-1 min-w-[220px] text-sm text-gray-700 dark:text-gray-300">Izinkan Google Analytics mengukur kunjungan dan halaman yang dibuka? Google dapat menggunakan cookie dan memproses data kunjungan. Pilihan ini opsional; isi form kontak tidak dikirim. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Privasi Google</a></p>
        <button type="button" onClick={() => choose('declined')} className="px-4 py-2 rounded-lg border border-gray-400 text-gray-800 dark:text-gray-100">Tolak</button>
        <button type="button" onClick={() => choose('accepted')} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Izinkan</button>
      </div>
    </aside>
  );
}
