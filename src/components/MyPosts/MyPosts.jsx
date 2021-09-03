import { Box, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import NavBar from "../NavBar/NavBar";
import useStyles from "../AllPosts/styles.js";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import feedionameCropped from "./feedionameCropped.png";
import {Link} from "react-router-dom";


const MyPosts = ({ handleLike, like, allPosts, handleReloadAfterWassupUpload }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [currentUserRefDoc, setcurrentUserRefDoc] = useState({});


  
  
  // let currentUserDoc = currentUser ? allPosts.find(user => user.email === currentUser.email) : null;
  // allPosts.forEach(user => console.log("user email => ",user.email));
  let myPosts = allPosts.find(post => currentUser && post.email=== currentUser.email)
  // console.log("allPosts from MyPosts =>", currentUserDoc && (currentUserDoc, currentUser.email));
  useEffect(async () => {
    const docRef = doc(db, "users", currentUser.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setcurrentUserRefDoc(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }, []);


  return (
    <>
    <Box className={classes.box} component={Link}
          to="/">
        <img
          className={classes.logo}
          src={feedionameCropped}
          alt="feedio logo"
        />
      </Box>
      {/* <Box className={classes.box}>
        <Divider className={classes.divider} />
      </Box> */}

      <Box className={classes.navbar}>
        <NavBar currentUsername={currentUserRefDoc.username}/>
      </Box>
      {myPosts && myPosts.posts.map(post => 
      <Box className={classes.postItem}>
          <Post handleLike={handleLike} like={like} likesCount={post.likes} wassupText={post.text} allPosts={allPosts} myPosts={myPosts} handleReloadAfterWassupUpload={handleReloadAfterWassupUpload} userEmail={currentUser.email}/>
        </Box>)}
      
        
      
    </>
  );
};

export default MyPosts;


