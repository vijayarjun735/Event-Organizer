import { setDoc, deleteDoc, collection, onSnapshot, doc } from "firebase/firestore";
import { db, auth } from "./firebase";


export const toggleFavourite = async (eventId, isFav) => {
  const favRef = doc(db, "users", auth.currentUser.uid, "favourites", eventId);
  if (isFav) {
    await deleteDoc(favRef);
  } else {
    await setDoc(favRef, {});
  }
};

export const listenFavourites = (cb) => {
  const favCol = collection(db, "users", auth.currentUser.uid, "favourites");
  return onSnapshot(favCol, (snap) => {
    cb(snap.docs.map((doc) => doc.id));
  });
};
