import { Printer, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE } from '../config/site';

export default function CV() {
  return (
    <section className="cv-page bg-gray-50 dark:bg-gray-950 py-12 px-4 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400"><ArrowLeft size={16} /> Home</Link>
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 font-medium">
            <Printer size={18} /> Cetak / Simpan PDF
          </button>
        </div>
        <p className="print:hidden text-sm text-gray-600 dark:text-gray-400 mb-6">Pratinjau CV ringkas. Untuk mengunduh, pilih Cetak / Simpan PDF, lalu pilih “Save as PDF” di dialog browser.</p>
        <article className="cv-document bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-7">
          <header className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h1 className="text-3xl font-bold mb-2">{SITE.name}</h1>
            <p className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-4">{SITE.tagline}</p>
            <address className="not-italic text-sm flex flex-col gap-1.5 break-words">
              <span>{SITE.location}</span>
              <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
              <a href={SITE.social.linkedin} className="underline">{SITE.social.linkedin}</a>
              <a href={SITE.social.github} className="underline">{SITE.social.github}</a>
              <a href={SITE.siteUrl} className="underline">{SITE.siteUrl}</a>
            </address>
          </header>
          <section>
            <h2 className="text-lg font-semibold mb-2">Profil</h2>
            <p className="leading-relaxed text-sm">Berfokus pada teknologi informasi dan eksplorasi AI untuk solusi praktis. Mengembangkan proyek web serta melanjutkan pembelajaran mandiri dalam troubleshooting, otomasi, dan integrasi AI.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Fokus Keterampilan</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              <li>IT: fondasi troubleshooting, sistem operasi, jaringan, dan administrasi sistem.</li>
              <li>AI: eksplorasi Python, analisis data, prompt engineering, dan integrasi AI.</li>
              <li>Tools pendukung: Git, GitHub, command line, pengembangan web, dan otomasi workflow.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Proyek</h2>
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h3 className="font-semibold">Portfolio Website</h3>
                <p>Website portfolio dengan React, TypeScript, Tailwind CSS, integrasi GitHub API, blog, dan dukungan tema gelap.</p>
                <a className="underline inline-flex items-center gap-1" href={`${SITE.social.github}/0xApatelos.github.io`}>github.com/0xApatelos/0xApatelos.github.io <ExternalLink size={12} className="print:hidden" /></a>
              </div>
              <div>
                <h3 className="font-semibold">Eksplorasi Clustering Teks</h3>
                <p>Pipeline Python dengan Metaflow, TF-IDF, dan K-Means untuk mengelompokkan teks bahasa Indonesia dari Excel serta mengekspor ringkasan cluster.</p>
                <a className="underline" href={`${SITE.social.github}/tugas-ipsd`}>github.com/0xApatelos/tugas-ipsd</a>
              </div>
              <div>
                <h3 className="font-semibold">Ratatouille</h3>
                <p>Proyek website restoran berbasis React dan Vite.</p>
                <a className="underline" href={`${SITE.social.github}/ratatouille`}>github.com/0xApatelos/ratatouille</a>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Pendidikan</h2>
            <p className="font-medium text-sm">S1 Informatika — Universitas Muhammadiyah Surakarta</p>
            <p className="text-sm mt-1">Mulai 2022 · Sedang cuti / tidak aktif berkuliah. Studi belum selesai.</p>
          </section>
        </article>
      </div>
    </section>
  );
}
