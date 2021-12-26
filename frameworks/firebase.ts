import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword as FBcreateUserWithEmailAndPassword,
  signOut as FBsignOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc as FBsetDoc,
  getDoc as FBgetDoc,
} from "firebase/firestore";
import Constants from "expo-constants";

const app = initializeApp({
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
});

const auth = getAuth(app);
const createUserWithEmailAndPassword = (email, password) => {
  return FBcreateUserWithEmailAndPassword(auth, email, password);
};

const db = getFirestore(app);

const setDoc = (collection, id, document) => {
  return FBsetDoc(doc(db, collection, id), document);
};

type GetDocType = (
  collection: string,
  id: string
) => Promise<{
  id: string;
  [x: string]: any;
}>;

const getDoc: GetDocType = async (collection, id) => {
  const docRef = doc(db, collection, id);
  const docSnap = await FBgetDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } else {
    return null;
  }
};

const signOut = () => {
  return FBsignOut(auth);
};

export { auth, createUserWithEmailAndPassword, setDoc, getDoc, signOut };
export default app;
