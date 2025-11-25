const articles = [
  {
    title: 'How to interpret heart rate variability',
    summary: 'Understand the science behind HRV and how it guides training readiness.',
    author: 'Health Node Editorial'
  },
  {
    title: 'Building a consistent sleep routine',
    summary: 'Actionable tips that align with your dashboard metrics and evening rituals.',
    author: 'Dr. Rest'
  }
];

export default function ArticlesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl space-y-8 px-6 py-12">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-500">Resources</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Health articles</h1>
        <p className="mt-3 text-slate-600">Extend the dashboard with SEO-friendly content pages.</p>
      </header>
      <section className="space-y-4">
        {articles.map((article) => (
          <article key={article.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">{article.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{article.summary}</p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">{article.author}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

