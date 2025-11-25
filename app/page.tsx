import Link from 'next/link';

const features = [
  {
    title: 'Unified metrics',
    description: 'Track weight, heart rate, sleep, and daily activity in one view.'
  },
  {
    title: 'Meaningful insights',
    description: 'Analytics utilities surface trends over time for proactive action.'
  },
  {
    title: 'Secure authentication',
    description: 'NextAuth with Google OAuth, secure cookies, and JWT strategy.'
  }
];

export default function MarketingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 pb-16 pt-20">
      <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-500">Health Node</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 lg:text-5xl">
            Launch a health-tracking dashboard in one afternoon.
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            This boilerplate pairs the Next.js App Router with MongoDB, NextAuth, Tailwind, and Sentry so you can focus on
            delivering measurable health outcomes, not wiring infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
              href="/dashboard"
            >
              Go to dashboard
            </Link>
            <Link className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900" href="/public/articles">
              Explore resources
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Daily snapshot</p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-4 py-3 text-white">
              <span className="text-sm">Heart rate</span>
              <span className="text-2xl font-semibold">62 bpm</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
              <span className="text-sm text-slate-500">Sleep</span>
              <span className="text-2xl font-semibold text-slate-900">7.4 hrs</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-100 px-4 py-3">
              <span className="text-sm text-slate-500">Activity</span>
              <span className="text-2xl font-semibold text-slate-900">54 min</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
