import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const AllUserDetailsContext = createContext();

export const AllUserDetailsProvider = ({ children }) => {
  const [allUserDocs, setAllUserDocs] = useState([]);
  // console.log("all user details context bro => ", allUserDocs)

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    // let allDocs = [];
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      //   allDocs.push(doc.data());
      setAllUserDocs((prevState) => [...prevState, doc.data()]);
    });
    // setAllUserDocs(allDocs)
  }, []);

  return (
    <AllUserDetailsContext.Provider value={[allUserDocs, setAllUserDocs]}>
      {children}
    </AllUserDetailsContext.Provider>
  );
};

// export default AllUserDetailsProvider;
