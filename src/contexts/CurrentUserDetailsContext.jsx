import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const CurrentUserDetailsContext = createContext();

export const CurrentUserDetailsProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [currentUserDoc, setCurrentUserDoc] = useState({});
  console.log("hoola hoop=>", currentUserDoc);

  // const fetchCurrentUserDocument = async () => {
  //   const docRef = doc(db, "users", currentUser);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap?.data());
  //     setCurrentUserDoc(docSnap?.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // };

  useEffect(async () => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCurrentUserDoc(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  }, []);

  return (
    <CurrentUserDetailsContext.Provider
      value={[currentUserDoc, setCurrentUserDoc]}
    >
      {children}
    </CurrentUserDetailsContext.Provider>
  );
};

