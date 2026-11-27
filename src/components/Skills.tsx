const FOCUS = [
  { title: 'IT Specialist', description: 'Understand the symptoms, test a hypothesis, then verify recovery. I practice this process through documented Linux incidents.', tools: 'Linux · networking fundamentals · troubleshooting · Bash', evidence: 'https://github.com/0xApatelos/IT-Operation-Lab/tree/HEAD/docs/incidents', label: 'Read the incident reports' },
  { title: 'AI Enthusiast', description: 'Exploring documentation-grounded search: finding relevant sources, showing citations, and recognizing questions outside the knowledge base.', tools: 'Python · BM25 · retrieval evaluation · FastAPI', evidence: 'https://github.com/0xApatelos/IT-Operation-Lab/tree/HEAD/assistant', label: 'Explore the search assistant' },
];

export default function Skills() {
  return (
    <section aria-labelledby="focus-heading" className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/30">
      <div className="site-container section-space">
        <p className="section-label mb-3">02 / Focus & practice</p>
        <h2 id="focus-heading" className="section-title">Learning through practice.</h2>
        <div className="mt-9 grid md:grid-cols-2 gap-9 md:gap-16">
          {FOCUS.map(item => <article key={item.title}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">{item.description}</p>
            <p className="mt-4 text-xs leading-6 text-gray-500 dark:text-gray-400">{item.tools}</p>
            <a href={item.evidence} target="_blank" rel="noopener noreferrer" className="text-link mt-4">{item.label} ↗</a>
          </article>)}
        </div>
      </div>
    </section>
  );
}
