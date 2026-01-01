import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Phase 3 Complete</h1>
      <p className="text-lg mb-8">I am ready for practical tasks.</p>
      
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
          Click Me (Does nothing yet)
        </button>
        <Link href="/dashboard" className="px-6 py-2 bg-green-500 rounded hover:bg-green-600 transition">
           Go to Dashboard
        </Link>
      </div>
    </main>
  );
}