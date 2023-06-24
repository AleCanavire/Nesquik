import { doc, getDoc, setDoc } from "firebase/firestore";
import { DB } from "./firebase.config";

export async function userExists(uid){
  const docRef = doc(DB, "users", uid);
  const res = await getDoc(docRef);
  return res.exists();
}

export async function getUser(uid){
  const docRef = doc(DB, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function updateUser(user) {
  await setDoc(doc(DB, "users", user.id), user);
}