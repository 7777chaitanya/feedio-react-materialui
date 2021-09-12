import { Box, Divider } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import Post from "../Post/Post";
import NavBar from "../NavBar/NavBar";
import useStyles from "../AllPosts/styles.js";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import feedionameCropped from "./feedionameCropped.png";
import { Link } from "react-router-dom";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";

const MyPosts = ({
  handleLike,
  like,
  allPosts,
  handleAllPostsUpdateDeleteOptimistically,
}) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [currentUserRefDoc, setcurrentUserRefDoc] = useState({});
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );

  return (
    <>
      <Box className={classes.box} component={Link} to="/">
        <img
          className={classes.logo}
          src={feedionameCropped}
          alt="feedio logo"
        />
      </Box>

      <Box className={classes.navbar}>
        <NavBar currentUsername={currentUserDoc?.username} />
      </Box>
      {currentUserDoc?.posts?.map((post) => (
        <Box className={classes.postItem}>
          <Post
            date={post.date}
            handleLike={handleLike}
            like={like}
            likesCount={post.likes}
            wassupText={post.text}
            allPosts={allPosts}
            myPosts={currentUserDoc.posts}
            handleAllPostsUpdateDeleteOptimistically={
              handleAllPostsUpdateDeleteOptimistically
            }
            userEmail={currentUserDoc.email}
            imageUrl={post.imageUrl}
          />
        </Box>
      ))}
    </>
  );
};

export default MyPosts;
