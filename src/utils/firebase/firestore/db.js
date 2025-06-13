import { toast } from "sonner";
import { app } from "..";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const db = getFirestore(app);

// Save user data to Firestore
const saveDoc = async (uid, data) => {
  const userDocRef = doc(db, "user", uid);
  return await setDoc(userDocRef, data).catch((error) => {
    toast.error(error.message);
    return error;
  });
};

// Get user data from Firestore
const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "user", uid);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.data();
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

// Get current timestamp
const getTimeStamp = () => {
  return serverTimestamp();
};

const fireStoreApi = {
  saveDoc,
  getUserData,
  getTimeStamp,
};

export default fireStoreApi;
