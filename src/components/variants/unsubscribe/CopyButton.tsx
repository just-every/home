'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';

type CopyButtonProps = { text: string; className?: string };

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className={className}
      aria-label={copied ? 'Commands copied' : 'Copy the commands'}
      onClick={() => {
        navigator.clipboard
          ?.writeText(text)
          .then(() => setCopied(true))
          .catch(() => setCopied(false));
      }}
    >
      {copied ? (
        <Check aria-hidden="true" size={16} strokeWidth={2} />
      ) : (
        <Copy aria-hidden="true" size={16} strokeWidth={1.8} />
      )}
    </button>
  );
}
