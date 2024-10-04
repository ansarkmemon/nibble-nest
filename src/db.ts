import {
  initializeApp,
  applicationDefault,
  cert,
  getApps,
} from 'firebase-admin/app';
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from 'firebase-admin/firestore';

const serviceAccount = require('../secrets/firebase-admin-key.json');

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export { db };
