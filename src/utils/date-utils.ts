import { Timestamp } from 'firebase-admin/firestore';

export type FirestoreDateFriendly = {
  _seconds: number;
  _nanoseconds: number;
};

export function convertFirestoreDateToDate(
  firestoreDate: FirestoreDateFriendly
) {
  if (!firestoreDate) return undefined;

  const { _seconds, _nanoseconds } = firestoreDate;
  if (typeof _seconds === 'number' && typeof _nanoseconds === 'number') {
    return new Timestamp(_seconds, _nanoseconds).toDate();
  }
  return null;
}

export const firestoreDatesConverter = {
  fromFirestore: (d: any) => convertFirestoreDatesInDocument(d.data()),
  toFirestore(d: any) {
    return d;
  },
};

const convertFirestoreDatesInDocument = (docData: any): any => {
  if (!docData) {
    return docData;
  }

  if (Array.isArray(docData)) {
    return docData.map((value) => {
      if (value instanceof Timestamp) {
        return value.toDate();
      } else if (typeof value === 'object') {
        return convertFirestoreDatesInDocument(value);
      }
      return value;
    });
  } else {
    return Object.fromEntries(
      Object.entries(docData).map(([field, value]) => {
        if (value instanceof Timestamp) {
          return [field, value.toDate()];
        } else if (typeof value === 'object') {
          return [field, convertFirestoreDatesInDocument(value)];
        }
        return [field, value];
      })
    );
  }
};
