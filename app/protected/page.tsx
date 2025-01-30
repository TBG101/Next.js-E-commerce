'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) router.push('/login');

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome {session?.user?.name}!</p>
    </div>
  );
}