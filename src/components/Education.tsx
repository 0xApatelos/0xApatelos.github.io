import { Link } from 'react-router-dom';

export default function Education() {
  return (
    <section aria-labelledby="education-heading" className="site-container pb-16 sm:pb-20">
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 grid gap-6 md:grid-cols-[200px_1fr]">
        <h2 id="education-heading" className="section-label">Education</h2>
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">Undergraduate studies in Informatics — Universitas Muhammadiyah Surakarta</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Started in 2022 · Currently on academic leave. Degree not yet completed.</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Continuing independent learning in IT and AI.</p>
          <Link to="/cv" className="text-link mt-4">View full CV ↗</Link>
        </div>
      </div>
    </section>
  );
}
