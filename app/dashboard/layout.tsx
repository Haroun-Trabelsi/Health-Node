import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { DashboardNav } from '@/components/layout/DashboardNav';
import { authOptions } from '@/lib/auth';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen space-y-6">
      <DashboardNav />
      <div className="px-6 pb-10">{children}</div>
    </div>
  );
}

