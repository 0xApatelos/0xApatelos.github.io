import React from 'react';

/**
 * Minimal, dependency-free Markdown renderer for blog posts.
 * Supports: headings (##, ###), bold, italic, inline code, fenced code
 * blocks, unordered/ordered lists, blockquotes, links, and paragraphs.
 * Output is plain React elements (no dangerouslySetInnerHTML), so content
 * from `src/data/posts.ts` can never inject HTML.
 */

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Order matters: code spans first, then bold, italic, links.
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    const key = `${keyPrefix}-${i++}`;

    if (token.startsWith('`')) {
      nodes.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm text-blue-600 dark:text-blue-400 font-mono"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**')) {
      nodes.push(
        <strong key={key}>{token.slice(2, -2)}</strong>
      );
    } else if (token.startsWith('*')) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const safe =
          href.startsWith('http://') ||
          href.startsWith('https://') ||
          href.startsWith('/') ||
          href.startsWith('#');
        if (safe) {
          nodes.push(
            <a
              key={key}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
            >
              {label}
            </a>
          );
        } else {
          nodes.push(label);
        }
      } else {
        nodes.push(token);
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

interface Block {
  type: 'heading' | 'paragraph' | 'ul' | 'ol' | 'code' | 'quote';
  level?: number;
  text?: string;
  items?: string[];
  lang?: string;
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i += 1;
      continue;
    }

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith('```')) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1; // closing fence
      blocks.push({ type: 'code', text: body.join('\n'), lang });
      continue;
    }

    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
      i += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quote.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push({ type: 'quote', text: quote.join(' ') });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Paragraph: consecutive non-empty, non-structural lines
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('```') &&
      !/^(#{2,4})\s+/.test(lines[i]) &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !lines[i].startsWith('> ')
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: 'paragraph', text: para.join(' ') });
  }

  return blocks;
}

export default function Markdown({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-5">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            const cls =
              'font-bold text-gray-900 dark:text-white mt-8 first:mt-0 ' +
              (block.level === 2
                ? 'text-2xl'
                : block.level === 3
                  ? 'text-xl'
                  : 'text-lg');
            if (block.level === 3) {
              return (
                <h3 key={idx} className={cls}>
                  {renderInline(block.text ?? '', `h-${idx}`)}
                </h3>
              );
            }
            return (
              <h2 key={idx} className={cls}>
                {renderInline(block.text ?? '', `h-${idx}`)}
              </h2>
            );
          }
          case 'code':
            return (
              <pre
                key={idx}
                className="p-4 rounded-xl bg-gray-950 text-gray-100 overflow-x-auto text-sm font-mono leading-relaxed border border-gray-800"
              >
                <code>{block.text}</code>
              </pre>
            );
          case 'ul':
            return (
              <ul key={idx} className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                {(block.items ?? []).map((item, j) => (
                  <li key={j}>{renderInline(item, `ul-${idx}-${j}`)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={idx} className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                {(block.items ?? []).map((item, j) => (
                  <li key={j}>{renderInline(item, `ol-${idx}-${j}`)}</li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400"
              >
                {renderInline(block.text ?? '', `q-${idx}`)}
              </blockquote>
            );
          default:
            return (
              <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {renderInline(block.text ?? '', `p-${idx}`)}
              </p>
            );
        }
      })}
    </div>
  );
}
