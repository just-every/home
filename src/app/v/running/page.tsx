import Link from 'next/link';

export default function RunningVariant() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Running</h1>
      <p className="mt-4">
        <Link href="/" className="underline underline-offset-4">
          Back to all five directions
        </Link>
      </p>
    </main>
  );
}
