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

  await docRef.set(
    { id: docRef.id, createdAt: new UTCDate() } as PartialWithFieldValue<T>,
    { merge: true }
  );
  return { id: docRef.id };
};

export const updateRecord = async <T extends DocumentData>(
  collection: string,
  id: string,
  data: PartialWithFieldValue<T>
) => {
  const docRef = await db
    .collection(collection)
    .withConverter(fsDataTypeConverter<T>())
    .doc(id);

  await docRef.update({ ...data, updatedAt: new UTCDate() });
  return { id };
};
