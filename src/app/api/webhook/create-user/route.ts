import { db } from '@/db';
import { User } from '@/types/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const auth0Data = await req.json();

  const user = auth0Data;

  user.firstName = auth0Data.given_name;
  user.lastName = auth0Data.family_name;
  user.picture = auth0Data.picture;
  user.auth0Id = auth0Data.user_id;

  const parsedUser = User.parse(user);
  const id = db.collection('users').doc().id;
  await db
    .collection('users')
    .doc(id)
    .set({ id, ...parsedUser });

  return NextResponse.json({ message: 'User created' });
}
