import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";

const updatePostLikedByAfterLikingInFirestore = async (inputObj,currentUserDoc) => {
    const userDocRef = doc(db, "users", currentUserDoc.email);
    await updateDoc(userDocRef, {
      ...inputObj,
    });
  };

export default updatePostLikedByAfterLikingInFirestore;