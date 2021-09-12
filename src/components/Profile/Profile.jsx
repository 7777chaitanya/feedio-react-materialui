import { Avatar, Box } from "@material-ui/core";
import React, { useContext } from "react";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import useStyles from "./styles.js";
import  AccountCircle  from "@material-ui/icons/AccountCircle";
import NavBar2 from "../NavBar2/NavBar2";

const Profile = ({ match }) => {
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const classes = useStyles();
  console.log("Profile comp =>", currentUserDoc);
  console.log(match.params.username);

  return (
      <>
      <NavBar2/>
      <Box className={classes.veryOuterBox}>
    <Box className={classes.profileHeaderContainer}>
      <Box className={classes.avatar}>
        {currentUserDoc?.avatarUrl ? (
          <Avatar
            alt={currentUserDoc?.username}
            src={currentUserDoc?.avatarUrl}
            className={classes.avatarSize}
          />
        ) : (
          <AccountCircle className={classes?.avatarSize} />
        )}
      </Box>
      <Box className={classes.profileDetails}>
          hello
      </Box>
    </Box>
    </Box>
    </>
  );
};

export default Profile;
