import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-sm text-black/60">404</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-3 text-black/70">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-black/5"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
