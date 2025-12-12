import Link from 'next/link';

const navItems = [
  { label: 'Every Code', href: 'https://github.com/just-every/code' },
  { label: 'GitHub', href: 'https://github.com/just-every' },
  {
    label: 'Docs',
    href: 'https://github.com/just-every/code/blob/main/docs/index.md',
  },
  { label: 'Reddit', href: 'https://www.reddit.com/r/justevery' },
] as const;

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/5 bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            href="/"
            className="font-display text-sm font-semibold tracking-wide text-white"
            aria-label="JustEvery home"
          >
            <span className="from-brand-cyan via-brand-violet to-brand-pink bg-gradient-to-r bg-clip-text text-transparent">
              JustEvery
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="flex max-w-[70vw] items-center gap-4 overflow-x-auto text-xs text-white/70 sm:gap-6 sm:text-sm"
          >
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
