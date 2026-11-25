import React from 'react';
import { Code2, Database, Terminal, Brain, GitBranch, Server, Monitor, Network, Wrench, Bot, Workflow, Globe } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

// Fokus keterampilan; bukan klaim sertifikasi atau tingkat keahlian.
const SKILLS: { category: string; items: Skill[] }[] = [
  { category: 'IT Specialist · Fondasi & Praktik', items: [
    { name: 'Troubleshooting', icon: <Wrench className="h-6 w-6" />, color: 'from-blue-400 to-cyan-500' },
    { name: 'Sistem Operasi', icon: <Monitor className="h-6 w-6" />, color: 'from-purple-400 to-pink-500' },
    { name: 'Dasar Jaringan', icon: <Network className="h-6 w-6" />, color: 'from-emerald-400 to-teal-500' },
    { name: 'Administrasi Sistem', icon: <Server className="h-6 w-6" />, color: 'from-indigo-400 to-blue-500' },
  ] },
  { category: 'AI Enthusiast · Sedang Dieksplorasi', items: [
    { name: 'Python', icon: <Code2 className="h-6 w-6" />, color: 'from-blue-400 to-cyan-500' },
    { name: 'Analisis Data', icon: <Database className="h-6 w-6" />, color: 'from-purple-400 to-pink-500' },
    { name: 'Prompt Engineering', icon: <Brain className="h-6 w-6" />, color: 'from-emerald-400 to-teal-500' },
    { name: 'Integrasi AI', icon: <Bot className="h-6 w-6" />, color: 'from-indigo-400 to-blue-500' },
  ] },
  { category: 'Tools Pendukung', items: [
    { name: 'Git & GitHub', icon: <GitBranch className="h-6 w-6" />, color: 'from-blue-400 to-cyan-500' },
    { name: 'Command Line', icon: <Terminal className="h-6 w-6" />, color: 'from-purple-400 to-pink-500' },
    { name: 'Web Development', icon: <Globe className="h-6 w-6" />, color: 'from-emerald-400 to-teal-500' },
    { name: 'Otomasi Workflow', icon: <Workflow className="h-6 w-6" />, color: 'from-indigo-400 to-blue-500' },
  ] },
];

export default function Skills() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & <span className="text-gradient">Focus</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Fokus pembelajaran dan praktik untuk IT Specialist & AI Enthusiast
          </p>
        </div>

        <div className="space-y-12">
          {SKILLS.map((group, groupIdx) => (
            <div key={group.category} className="reveal" style={{ transitionDelay: `${groupIdx * 150}ms` }}>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                {group.category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {group.items.map((skill, idx) => (
                  <div
                    key={skill.name}
                    className="group relative p-5 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:scale-[1.02] cursor-default"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Gradient border on hover */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[1px]`} />
                    <div className="absolute inset-[1px] rounded-xl bg-white dark:bg-gray-900/90 -z-10" />

                    <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-r ${skill.color} bg-opacity-10 text-white mb-3`}>
                      {skill.icon}
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
