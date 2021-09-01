import { Box } from "@material-ui/core";
import React from "react";
import Post from "../Post/Post";
import NavBar from "../NavBar/NavBar";
import useStyles from "../AllPosts/styles.js";
import { useAuth } from "../../contexts/AuthContext";

const MyPosts = ({ handleLike, like, allPosts }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  let myPosts = allPosts.find(post => currentUser && post.email=== currentUser.email)


  console.log("my posts =>",( myPosts && myPosts.posts));
  return (
    <>

      <Box className={classes.navbar}>
        <NavBar />
      </Box>
      {myPosts && myPosts.posts.map(post => 
      <Box className={classes.postItem}>
          <Post handleLike={handleLike} like={like} likesCount={post.likes} wassupText={post.text} />
        </Box>)}
      
        
      
    </>
  );
};

export default MyPosts;

// doc.data() is never undefined for query doc snapshots
// console.log(doc.id, " => ", doc.data());

// temporaryDocumentHolder.forEach(post => {
//   allPosts.push(post)
// })
// ---------
// let temporaryDocumentHolder = doc.data().posts;
// temporaryDocumentHolder.forEach(post =>{
//   allPosts.push(post)
//   -------------------
