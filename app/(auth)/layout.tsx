import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="py-4 px-6">
        <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          🏃 Community Sports
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
