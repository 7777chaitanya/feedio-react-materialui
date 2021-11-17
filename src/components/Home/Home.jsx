import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Wassup from "../Wassup/Wassup";
import NavBar from "../NavBar/NavBar";
import NavBar2 from "../NavBar2/NavBar2";
import AllPosts2 from "../AllPosts2/AllPosts2";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Box, IconButton, Tooltip } from "@material-ui/core";
import { CurrentUserDetailsContext } from '../../contexts/CurrentUserDetailsContext';
import useStyles from "./styles";

const Home = ({handleAllPostsUpdateDeleteOptimistically,handleDummy,allPosts}) => {
  const { currentUser } = useAuth();
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );

  const classes = useStyles();

  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };
    


  

  return (
    <div>
      {/* <NavBar currentUsername={currentUserDoc.username} handleAllPostsUpdateDeleteOptimistically={handleAllPostsUpdateDeleteOptimistically} /> */}
      <NavBar2/>
      <Wassup currentUser={currentUser} handleAllPostsUpdateDeleteOptimistically={handleAllPostsUpdateDeleteOptimistically} handleDummy={handleDummy} allPosts={allPosts}/>
      <AllPosts2/>
      
      <Box className={classes.goToTopButtonBox}>
        <Tooltip title="Go to top">
          <IconButton onClick={handleGoToTop}>
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
};

export default Home;
