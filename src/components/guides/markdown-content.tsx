import Link from 'next/link';

export interface MarkdownContentProps {
  content: string;
}

// Simple markdown-to-HTML renderer for guide/news content.
// Handles headings, paragraphs, bold, italic, links, lists, tables, and code.
export function MarkdownContent({ content }: MarkdownContentProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  function parseInline(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    // Process bold, italic, links, and inline code
    const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\))/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      if (match[2]) {
        parts.push(<strong key={`b-${match.index}`}>{match[2]}</strong>);
      } else if (match[3]) {
        parts.push(<em key={`i-${match.index}`}>{match[3]}</em>);
      } else if (match[4]) {
        parts.push(
          <code key={`c-${match.index}`} className="rounded bg-muted px-1 py-0.5 text-xs font-mono">
            {match[4]}
          </code>
        );
      } else if (match[5] && match[6]) {
        const href = match[6];
        const isInternal = href.startsWith('/');
        if (isInternal) {
          parts.push(
            <Link key={`l-${match.index}`} href={href} className="text-primary underline hover:text-primary/80">
              {match[5]}
            </Link>
          );
        } else {
          parts.push(
            <a key={`l-${match.index}`} href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              {match[5]}
            </a>
          );
        }
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts.length > 0 ? parts : [text];
  }

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const headers = line.split('|').filter(Boolean).map((h) => h.trim());
      i += 2; // skip header and separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') {
        rows.push(lines[i].split('|').filter(Boolean).map((c) => c.trim()));
        i++;
      }
      elements.push(
        <div key={key++} className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                {headers.map((h, hi) => (
                  <th key={hi} className="px-3 py-2 text-left font-semibold text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border/30">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2">
                      {parseInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="mt-6 mb-2 text-base font-bold">{parseInline(line.slice(4))}</h3>);
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="mt-8 mb-3 text-xl font-bold">{parseInline(line.slice(3))}</h2>);
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(lines[i].replace(/^[-*] /, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 ml-4 list-disc space-y-1 text-sm text-muted-foreground">
          {items.map((item, idx) => (
            <li key={idx}>{parseInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-3 ml-4 list-decimal space-y-1 text-sm text-muted-foreground">
          {items.map((item, idx) => (
            <li key={idx}>{parseInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="my-2 text-sm text-muted-foreground leading-relaxed">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className="prose-custom">{elements}</div>;
}
