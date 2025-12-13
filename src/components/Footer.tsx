export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-white/70 sm:flex-row sm:text-left sm:text-sm">
        <p>© {currentYear} JustEvery · Open source. Built in public.</p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/just-every"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <span className="text-white/30">·</span>
          <a
            href="https://www.reddit.com/r/justevery"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Reddit
          </a>
        </div>
      </div>
    </footer>
  );
}
