'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

export const UserInfo = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user?.name}</div>;
};
