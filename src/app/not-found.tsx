import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex flex-1 items-center justify-center px-4">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-sm text-white/60">404</p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-3 text-white/70">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
