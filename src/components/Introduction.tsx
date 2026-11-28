import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import profile from '../assets/profile.webp';
import { SITE } from '../config/site';

export default function Introduction() {
  return (
    <section aria-labelledby="intro-heading" className="site-container pt-14 pb-14 sm:pt-20 sm:pb-20">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px] lg:gap-20">
        <div>
          <p className="section-label mb-6">Portfolio / Surakarta, Indonesia</p>
          <h1 id="intro-heading" className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.055em] leading-[1.08] text-gray-900 dark:text-gray-50">
            {SITE.name.split(' ').slice(0, 2).join(' ')}<br />{SITE.name.split(' ').slice(2).join(' ')}<span className="text-blue-700 dark:text-blue-400">.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200">{SITE.tagline}</p>
          <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            I focus on system troubleshooting, automated health checks, and documentation-grounded search.
            This is a record of what I build, how it works, and what still needs improvement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" onClick={event => {
              event.preventDefault();
              const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
              document.getElementById('projects')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
            }} className="button-primary">Explore projects <ArrowDown size={16} aria-hidden="true" /></a>
            <Link to="/cv" className="button-secondary">View CV <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-600 dark:text-gray-400">
            <a className="quiet-link" href={SITE.social.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="quiet-link" href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <Link className="quiet-link" to="/contact">Get in touch ↗</Link>
          </div>
        </div>
        <figure className="max-w-[320px] w-full md:justify-self-end">
          <img src={profile} alt={SITE.name} width={640} height={800} loading="eager" decoding="async" className="aspect-[4/5] w-full object-cover object-center rounded-sm bg-gray-100 dark:bg-gray-800" />
          <figcaption className="flex justify-between gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400"><span>Raka Rendra Fayanto</span><span>Indonesia / UTC+7</span></figcaption>
        </figure>
      </div>
      <div className="mt-12 sm:mt-16 border-t border-gray-200 dark:border-gray-800 pt-5 flex flex-wrap gap-x-8 gap-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        <span>01 / From GitHub</span><span>02 / Focus & practice</span><span>03 / Field notes</span>
      </div>
    </section>
  );
}
