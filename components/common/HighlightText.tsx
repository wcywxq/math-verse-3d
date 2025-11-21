import React from 'react';

// Utility to escape regex special characters
export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface Props {
  text: string;
  highlight: string;
  className?: string;
}

export const HighlightText: React.FC<Props> = ({ text, highlight, className }) => {
  if (!highlight || !highlight.trim()) {
    return <span className={className}>{text}</span>;
  }

  // Create a regex that matches the highlight string case-insensitively
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        // Check if this part matches the highlight (case-insensitive check)
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="text-red-700 bg-yellow-300 rounded-sm px-0.5 font-extrabold shadow-sm">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};