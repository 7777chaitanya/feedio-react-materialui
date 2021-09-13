import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import useStyles from "./styles.js";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NavBar2 from "../NavBar2/NavBar2";
import MyPosts2 from "../MyPosts2/MyPosts2";
import LikedPosts from "../LikedPosts/LikedPosts";
import SavedPosts from "../SavedPosts/SavedPosts"

const Profile = ({ match }) => {
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState("posts");
  console.log("Profile comp =>", currentUserDoc);
  console.log(match.params.username);

  const handleCurrentTabChange = (value) => {
    setCurrentTab(value);
  }

  return (
    <>
      <NavBar2 />
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
            <Box className={classes.usernameAndEditProfileButtonContainer}>
              <Typography variant="h4" className={classes.username}>
                {currentUserDoc?.username}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.editProfileButton}
              >
                Edit Profile
              </Button>
            </Box>
            <Box className={classes.followerCountBox}>
              <Typography variant="body1">
                <span className={classes.followerCountBoxNumbers}>45</span>{" "}
                posts
              </Typography>
              <Typography variant="body1">
                <span className={classes.followerCountBoxNumbers}>704</span>{" "}
                followers
              </Typography>
              <Typography variant="body1">
                <span className={classes.followerCountBoxNumbers}>678</span>{" "}
                following
              </Typography>
            </Box>
            <Typography variant="body1" className={classes.bio}>
              {currentUserDoc?.bio}
            </Typography>
          </Box>
        </Box>

        <Box className={classes.followerCountBoxForSmallDevices}>
          <Box className={classes.eachCountItem}>
            <Typography
              variant="body1"
              className={classes.followerCountBoxNumbers}
            >
              45
            </Typography>
            <Typography variant="body2">posts</Typography>
          </Box>
          <Box className={classes.eachCountItem}>
            <Typography
              variant="body1"
              className={classes.followerCountBoxNumbers}
            >
              704
            </Typography>
            <Typography variant="body2">followers</Typography>
          </Box>
          <Box className={classes.eachCountItem}>
            <Typography
              variant="body1"
              className={classes.followerCountBoxNumbers}
            >
              678
            </Typography>
            <Typography variant="body2">following</Typography>
          </Box>
        </Box>

        <Box className={classes.buttonGroup}>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="contained primary button group"
            fullWidth={true}
          >
            <Button className={classes.eachButtonInButtonGroup} onClick={() => handleCurrentTabChange("posts")}>posts</Button>
            <Button className={classes.eachButtonInButtonGroup} onClick={() => handleCurrentTabChange("saved")}>saved</Button>
            <Button className={classes.eachButtonInButtonGroup} onClick={() => handleCurrentTabChange("liked")}>liked</Button>
          </ButtonGroup>
        </Box>

        <Box>
          {currentTab==="posts" && <MyPosts2/>}
          {currentTab==="liked" && <LikedPosts/>}
          {currentTab==="saved" && <SavedPosts/>}
          
        </Box>
      </Box>
    </>
  );
};

export default Profile;
