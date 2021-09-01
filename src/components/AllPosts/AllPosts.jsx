import { Box, Divider } from "@material-ui/core";
import React from "react";
import Post from "../Post/Post";
import NavBar from "../NavBar/NavBar";
import useStyles from "./styles.js";
import { useAuth } from "../../contexts/AuthContext";
import feedionameCropped from "./feedionameCropped.png";


const AllPosts = ({ handleLike, like, allPosts }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
//   let myPosts = allPosts;
//   let onlyPosts = [];
//   myPosts.forEach(doc => {
//     let temporaryDocumentHolder = doc.data().posts;
//       temporaryDocumentHolder.forEach(post => {
//           onlyPosts.push(post)
//         })

//   });

    let myPosts = [];
    allPosts.forEach(post => 
        
       { 
           let username=post.username;
        console.log("post =>",post);  
        let tempArray = post.posts;
    tempArray.forEach(obj => {
        obj.username=username;
        myPosts.push(obj)
    })
    }

        )
  


  console.log("my posts =>",( myPosts && myPosts));
  return (
    <>
    <Box className={classes.box}>
        <img
          className={classes.logo}
          src={feedionameCropped}
          alt="feedio logo"
        />
      </Box>
      <Box className={classes.box}>
        <Divider className={classes.divider} />
      </Box>

      <Box className={classes.navbar}>
        <NavBar />
      </Box>
      {myPosts && myPosts.map(post => 
      <Box className={classes.postItem}>
          <Post handleLike={handleLike} like={like} likesCount={post.likes} wassupText={post.text} userName={post.username}/>
        </Box>)}
      
        
      
    </>
  );
};

export default AllPosts;

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
