import { app } from "..";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "sonner";

const auth = getAuth(app);

async function signUpWithEamilPassword(authData) {
  return await createUserWithEmailAndPassword(
    auth,
    authData.email,
    authData.password
  ).catch((error) => {
    toast.error(error.message);
  });
}

async function signInWithEmailPassword(authData) {
  return await signInWithEmailAndPassword(
    auth,
    authData.email,
    authData.password
  ).catch((error) => {
    toast.error(error.message);
  });
}

const handleLogout = async () => {
  return await auth.signOut;
};

async function resetPassword(resetEmail) {
  try {
    await sendPasswordResetEmail(auth, resetEmail);
  } catch (error) {
    toast.error(error.message);
  }
}

const authApi = {
  signUpWithEamilPassword,
  signInWithEmailPassword,
  handleLogout,
  resetPassword,
};

export default authApi;
