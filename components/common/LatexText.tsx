import React, { useEffect, useRef } from 'react';

interface Props {
  text: string;
  className?: string;
}

declare global {
  interface Window {
    katex: any;
  }
}

export const LatexText: React.FC<Props> = ({ text, className = "" }) => {
  // Split text by '$' delimiter. 
  // Example: "Speed is $v = s/t$." -> ["Speed is ", "v = s/t", "."]
  const parts = text.split('$');

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Odd indices are the math parts (inside $...$)
        if (index % 2 === 1) {
          return <LatexSpan key={index} expression={part} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

const LatexSpan: React.FC<{ expression: string }> = ({ expression }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current && window.katex) {
      try {
        // Use renderToString instead of render to bypass "Quirks Mode" restrictions
        // in iframe environments and for better stability.
        const html = window.katex.renderToString(expression, {
          throwOnError: false,
          displayMode: false,
        });
        containerRef.current.innerHTML = html;
      } catch (e) {
        console.warn("KaTeX rendering error:", e);
        containerRef.current.innerText = `$${expression}$`;
      }
    }
  }, [expression]);

  return <span ref={containerRef} className="inline-block mx-0.5 text-indigo-700" />;
};