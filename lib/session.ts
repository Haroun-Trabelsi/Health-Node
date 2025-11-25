import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { ApiError } from '@/utils/error';

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const getSessionUser = async (): Promise<SessionUser> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new ApiError('Unauthorized', 401);
  }

  return session.user as SessionUser;
};

