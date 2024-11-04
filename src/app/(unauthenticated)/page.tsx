import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { HomePage } from '@/components/HomePage';

export default async function Home() {
  const session = await getSession();

  if (session?.user) {
    redirect('/recipes');
  }

  return <HomePage />;
}
