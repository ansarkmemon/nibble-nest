import { db } from '@/db';
import { fsDataTypeConverter } from './fsDataTypeConverter';
import {
  DocumentData,
  PartialWithFieldValue,
  WithFieldValue,
} from 'firebase-admin/firestore';
import { UTCDate } from '@date-fns/utc';

export const createRecord = async <T extends DocumentData>(
  collection: string,
  data: WithFieldValue<T>
) => {
  const docRef = await db
    .collection(collection)
    .withConverter(fsDataTypeConverter<T>())
    .add(data);

  console.log('new UTCDate()', new UTCDate());

  await docRef.set(
    { id: docRef.id, createdAt: new UTCDate() } as PartialWithFieldValue<T>,
    { merge: true }
  );
  return { id: docRef.id };
};
