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
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  // console.log("all User docs bro => ", allUserDocs)
  let allThePosts = [];
  allUserDocs?.forEach(doc=>doc?.posts.forEach(post => allThePosts.push(post)));
  console.log("AllPosts extracted",allThePosts);
  



  // let myPosts = [];
  // allPosts.forEach((post) => {
  //   let username = post.username;
  //   let email = post.email;
  //   let tempArray = post.posts;
  //   tempArray && tempArray.forEach((obj) => {
  //     obj.username = username;
  //     obj.email=email;
  //     // console.log("obj =>",obj);
  //     myPosts.push(obj);
  //   });
  // });

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
    

      <Box className={classes.navbar}>
        <NavBar currentUsername={currentUserDoc.username}/>
      </Box>
      {allThePosts?.map((post) => (
          <Box className={classes.postItem}>
            <Post
              handleLike={handleLike}
              like={like}
              likesCount={post.likes}
              wassupText={post.text}
              userName={post.username}
              userEmail={post.email}
              imageUrl={post.imageUrl}
            />
          </Box>
        ))}
    </>
  );
};

export default AllPosts;


