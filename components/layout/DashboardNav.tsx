import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/public/articles', label: 'Articles' }
];

export const DashboardNav = () => (
  <nav className="flex items-center gap-6 border-b border-slate-200 px-6 py-4">
    <p className="text-lg font-semibold text-slate-900">Health Dashboard</p>
    <ul className="flex gap-4 text-sm text-slate-500">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link className="transition hover:text-slate-900" href={item.href}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

