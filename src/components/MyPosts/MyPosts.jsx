import { Box } from "@material-ui/core";
import React from "react";
import Post from "../Post/Post";
import NavBar from "../NavBar/NavBar";
import { classes } from "istanbul-lib-coverage";
import useStyles from "./styles.js";

const MyPosts = ({ handleLike, like }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.navbar}>
        <NavBar />
      </Box>
      <Box>
        <Box className={classes.postItem}>
          <Post handleLike={handleLike} like={like} />
        </Box>
        <Box className={classes.postItem}>
          <Post />
        </Box>
        <Box className={classes.postItem}>
          <Post />
        </Box>
        <Box className={classes.postItem}>
          <Post />
        </Box>
      </Box>
    </>
  );
};

export default MyPosts;
