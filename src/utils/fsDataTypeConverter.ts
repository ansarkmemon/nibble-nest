import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
const fsDataTypeConverter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export { fsDataTypeConverter };
