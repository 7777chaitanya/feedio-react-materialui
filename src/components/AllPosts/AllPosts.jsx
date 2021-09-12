import { Box, Divider } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import Post from "../Post/Post";
import NavBar from "../NavBar/NavBar";
import useStyles from "./styles.js";
import { useAuth } from "../../contexts/AuthContext";
import feedionameCropped from "./feedionameCropped.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useLocation, Link } from "react-router-dom";
import { CurrentUserDetailsContext } from '../../contexts/CurrentUserDetailsContext';
import {AllUserDetailsContext} from '../../contexts/AllUserDetailsContext';


const AllPosts = ({ handleLike, like, allPosts, handleAllPostsUpdateDeleteOptimistically }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [currentUserRefDoc, setcurrentUserRefDoc] = useState({});
  const location = useLocation();
  const [currentUserDoc, setCurrentUserDoc] = useContext(CurrentUserDetailsContext);
  console.log("all posts bro => ", currentUserDoc);
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  console.log("allusercontext in allposts => ",allUserDocs)

  // useEffect(async () => {
  //   if(currentUser){
  //   const docRef = doc(db, "users", currentUser.email);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     setcurrentUserRefDoc(docSnap.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }}, []);



  let myPosts = [];
  allPosts.forEach((post) => {
    let username = post.username;
    let email = post.email;
    // console.log("post =>", post);
    let tempArray = post.posts;
    tempArray && tempArray.forEach((obj) => {
      obj.username = username;
      obj.email=email;
      console.log("obj =>",obj);
      myPosts.push(obj);
    });
  });

  console.log("my posts =>", myPosts && myPosts);
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
      {myPosts &&
        myPosts.map((post) => (
          <Box className={classes.postItem}>
            <Post
              handleLike={handleLike}
              like={like}
              likesCount={post.likes}
              wassupText={post.text}
              userName={post.username}
              userEmail={post.email}
            />
          </Box>
        ))}
    </>
  );
};

export default AllPosts;


