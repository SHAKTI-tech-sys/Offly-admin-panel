import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "ai-studio-applet-webapp-58be9",
  appId: "1:708091179947:web:9fca030aaf073170ac98ee",
  apiKey: "AIzaSyAK2XZKxUosAdOcSyqmfbSN1ba92Oc0Gdw",
  authDomain: "ai-studio-applet-webapp-58be9.firebaseapp.com",
  storageBucket: "ai-studio-applet-webapp-58be9.firebasestorage.app",
  messagingSenderId: "708091179947",
  measurementId: "",
  firestoreDatabaseId: "ai-studio-dcff3990-cec3-4e2f-a851-351cec4a4045"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
