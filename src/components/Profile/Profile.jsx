import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  createTheme,
  Modal,
  Typography,
  ThemeProvider,
  Snackbar,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import useStyles from "./styles.js";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NavBar2 from "../NavBar2/NavBar2";
import MyPosts2 from "../MyPosts2/MyPosts2";
import LikedPosts from "../LikedPosts/LikedPosts";
import SavedPosts from "../SavedPosts/SavedPosts";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LinearIndeterminate from "../LinearIndeterminate/LinearIndeterminate";
import { ClickContext } from "../../contexts/ClickContext";
import { Alert } from "@material-ui/lab";
import clsx from "clsx";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";


const theme = createTheme({
  palette: {
    secondary: {
      main: "rgb(107,187,117)",
      dark: "rgb(0, 171, 107)",
    },
  },
});

const Profile = ({ match }) => {
  const { closeDisplayPopUp } = useContext(ClickContext);

  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);

  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState("posts");
  console.log("Profile comp =>", currentUserDoc);
  console.log(match.params.username);
  let profileBelongsTo = allUserDocs.find(
    (doc) => doc.username === match.params.username
  );
  console.log("profileBelongsTo =>", profileBelongsTo);
  console.log(currentUserDoc);

  const handleCurrentTabChange = (value) => {
    setCurrentTab(value);
  };

  const addToFollowingArrayInFireStore = async () => {
    const currentUserDocRef = doc(db, "users", currentUserDoc.email);

    await updateDoc(currentUserDocRef, {
      following: arrayUnion(profileBelongsTo.email),
    });
  };

  const AddToFollowingArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      const currentUserDocCopy = { ...prevState };
      if (
        currentUserDocCopy?.following?.indexOf(profileBelongsTo?.email) === -1
      ) {
        addToFollowingArrayInFireStore();
        currentUserDocCopy?.following?.push(profileBelongsTo?.email);
      }
      return { ...currentUserDocCopy };
    });
  };

  const addToFollowersArrayInFireStore = async (notificationObject) => {
    console.log("notificationObject => ", notificationObject);
    const profileBelongsToDocRef = doc(db, "users", profileBelongsTo?.email);

    await updateDoc(profileBelongsToDocRef, {
      followers: arrayUnion(currentUserDoc?.email),
      notifications: arrayUnion({ ...notificationObject }),
    });
  };

  const AddToFollowersArrayInProfileBelongsTo = () => {
    setAllUserDocs((prevState) => {
      const allUserDocsCopy = [...prevState];
      const profileOwnerReference = allUserDocsCopy?.find(
        (doc) => doc?.email === profileBelongsTo?.email
      );
      if (
        profileOwnerReference?.followers?.indexOf(currentUserDoc.email) === -1
      ) {
        const notificationObject = {
          username: currentUserDoc.username,
          email: currentUserDoc.email,
          date: new Date(),
        };
        profileOwnerReference?.notifications?.push(notificationObject);
        addToFollowersArrayInFireStore({ ...notificationObject });
        profileOwnerReference?.followers?.push(currentUserDoc.email);
      }
      return [...allUserDocsCopy];
    });
  };

  const [followingSnackbar, setFollowingSnackbar] = useState(false);
  const handleFollowingSnackbar = () => {
    setFollowingSnackbar((p) => !p);
  };

  const [unfollowingSnackbar, setUnfollowingSnackbar] = useState(false);
  const handleUnfollowingSnackbar = () => {
    setUnfollowingSnackbar((p) => !p);
  };

  const handleFollow = () => {
    AddToFollowingArrayInCurrentUserDoc();
    AddToFollowersArrayInProfileBelongsTo();
    handleFollowingSnackbar();
  };

  const removeFromFollowingArrayInFirestore = async () => {
    const currentUserDocRef = doc(db, "users", currentUserDoc.email);

    await updateDoc(currentUserDocRef, {
      following: arrayRemove(profileBelongsTo.email),
    });
  };

  const removeFromFollowersArrayInFirestore = async (
    notificationObjectToRemove
  ) => {
    const profileBelongsToDocRef = doc(db, "users", profileBelongsTo.email);
    console.log(
      "removeFromFollowersArrayInFirestorev=>",
      notificationObjectToRemove
    );
    await updateDoc(profileBelongsToDocRef, {
      followers: arrayRemove(currentUserDoc.email),
      notifications: arrayRemove(notificationObjectToRemove),
    });
  };

  const RemoveFromFollowingArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      const currentUserDocCopy = { ...prevState };
      let index = currentUserDocCopy.following.indexOf(profileBelongsTo.email);
      if (index > -1) {
        currentUserDocCopy?.following?.splice(index, 1);
      }
      removeFromFollowingArrayInFirestore();
      return { ...currentUserDocCopy };
    });
  };
  const RemoveFromFollowersArrayInProfileBelongsTo = () => {
    setAllUserDocs((prevState) => {
      const allUserDocsCopy = [...prevState];
      const profileOwnerReference = allUserDocsCopy?.find(
        (doc) => doc?.email === profileBelongsTo?.email
      );
      let index = profileOwnerReference?.followers?.indexOf(
        currentUserDoc.email
      );
      if (index > -1) {
        profileOwnerReference?.followers?.splice(index, 1);
      }

      let notificationObjectToRemove =
        profileOwnerReference?.notifications?.find(
          (obj) => obj.email === currentUserDoc.email
        );
      let notificationObjectIndex =
        profileOwnerReference?.notifications?.indexOf(
          notificationObjectToRemove
        );
      console.log("notification => ", notificationObjectIndex);

      if (notificationObjectIndex > -1) {
        profileOwnerReference?.notifications?.splice(index, 1);
      }
      removeFromFollowersArrayInFirestore({ ...notificationObjectToRemove });
      return [...allUserDocsCopy];
    });
  };

  const handleUnfollow = () => {
    RemoveFromFollowingArrayInCurrentUserDoc();
    RemoveFromFollowersArrayInProfileBelongsTo();
    handleUnfollowingSnackbar();
  };

  const checkIfUserIsFollowed = () => {
    if (currentUserDoc?.following?.includes(profileBelongsTo?.email)) {
      return (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.editProfileButton}
          onClick={handleUnfollow}
        >
          Following
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.editProfileButton}
          onClick={handleFollow}
        >
          Follow
        </Button>
      );
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showLinearIndeterminate, setShowLinearIndeterminate] = useState(false);
  const handleLinearIndeterminate = () => {
    setShowLinearIndeterminate((prevState) => !prevState);
  };

  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };


  return (
    <Box className={classes.profileCover}>
      <NavBar2 />
      {showLinearIndeterminate && <LinearIndeterminate />}
      <Box onClick={closeDisplayPopUp}>
        <Box className={classes.veryOuterBox} onClick={closeDisplayPopUp}>
          <Box className={classes.profileHeaderContainer}>
            <Box className={classes.avatar}>
              {profileBelongsTo?.avatarUrl ? (
                <Avatar
                  alt={profileBelongsTo?.username}
                  src={profileBelongsTo?.avatarUrl}
                  className={classes.avatarSize}
                />
              ) : (
                <AccountCircle className={classes?.avatarSize} />
              )}
            </Box>
            <Box className={classes.profileDetails}>
              <Box className={classes.usernameAndEditProfileButtonContainer}>
                <Typography variant="h4" className={classes.username}>
                  {profileBelongsTo?.username}
                </Typography>
                <ThemeProvider theme={theme}>
                  {profileBelongsTo?.username === currentUserDoc.username ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.editProfileButton}
                      onClick={handleOpen}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    // <Button
                    //   variant="contained"
                    //   color="primary"
                    //   size="small"
                    //   className={classes.editProfileButton}
                    // >
                    //   Follow
                    // </Button>
                    checkIfUserIsFollowed()
                  )}
                </ThemeProvider>
              </Box>
              <Box className={classes.followerCountBox}>
                <Typography variant="body1">
                  <span className={classes.followerCountBoxNumbers}>
                    {profileBelongsTo?.posts?.length}
                  </span>{" "}
                  posts
                </Typography>
                <Typography variant="body1">
                  <span className={classes.followerCountBoxNumbers}>
                    {profileBelongsTo?.followers?.length}
                  </span>{" "}
                  followers
                </Typography>
                <Typography variant="body1">
                  <span className={classes.followerCountBoxNumbers}>
                    {profileBelongsTo?.following?.length}
                  </span>{" "}
                  following
                </Typography>
              </Box>
              <Typography variant="body1" className={classes.bio}>
                {profileBelongsTo?.bio}
              </Typography>
            </Box>
          </Box>

          <Box className={classes.followerCountBoxForSmallDevices}>
            <Box className={classes.eachCountItem}>
              <Typography
                variant="body1"
                className={classes.followerCountBoxNumbers}
              >
                {profileBelongsTo?.posts?.length}
              </Typography>
              <Typography variant="body2">posts</Typography>
            </Box>
            <Box className={classes.eachCountItem}>
              <Typography
                variant="body1"
                className={classes.followerCountBoxNumbers}
              >
                {profileBelongsTo?.followers?.length}
              </Typography>
              <Typography variant="body2">followers</Typography>
            </Box>
            <Box className={classes.eachCountItem}>
              <Typography
                variant="body1"
                className={classes.followerCountBoxNumbers}
              >
                {profileBelongsTo?.following?.length}
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
              <Button
                // className={classes.eachButtonInButtonGroup}
                className={clsx(
                  classes.eachButtonInButtonGroup,
                  currentTab === "posts" && classes.selectedButton
                )}
                onClick={() => handleCurrentTabChange("posts")}
                // variant="contained"
                // color="secondary"
              >
                posts
              </Button>
              <Button
                // className={classes.eachButtonInButtonGroup}
                className={clsx(
                  classes.eachButtonInButtonGroup,
                  currentTab === "saved" && classes.selectedButton
                )}
                onClick={() => handleCurrentTabChange("saved")}
              >
                saved
              </Button>
              <Button
                // className={classes.eachButtonInButtonGroup}
                className={clsx(
                  classes.eachButtonInButtonGroup,
                  currentTab === "liked" && classes.selectedButton
                )}
                onClick={() => handleCurrentTabChange("liked")}
              >
                liked
              </Button>
            </ButtonGroup>
          </Box>

          <Box>
            {currentTab === "posts" && (
              <MyPosts2 profileBelongsTo={profileBelongsTo} />
            )}
            {currentTab === "liked" && (
              <LikedPosts profileBelongsTo={profileBelongsTo} />
            )}
            {currentTab === "saved" && (
              <SavedPosts profileBelongsTo={profileBelongsTo} />
            )}
          </Box>
        </Box>
      </Box>
      <EditProfileModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleLinearIndeterminate={handleLinearIndeterminate}
      />
      <Snackbar
        open={followingSnackbar}
        autoHideDuration={1000}
        onClose={handleFollowingSnackbar}
      >
        <Alert onClose={handleFollowingSnackbar} severity="success">
          You started following {profileBelongsTo?.username}
        </Alert>
      </Snackbar>

      <Snackbar
        open={unfollowingSnackbar}
        autoHideDuration={1000}
        onClose={handleUnfollowingSnackbar}
      >
        <Alert onClose={handleUnfollowingSnackbar} severity="error">
          Unfollowed {profileBelongsTo?.username}
        </Alert>
      </Snackbar>

      <Box className={classes.goToTopButtonBox}>
        <Tooltip title="Go to top">
          <IconButton onClick={handleGoToTop}>
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
    </Box>
  );
};

export default Profile;
