import React, { useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useStyles from "./styles.js";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase.js";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  createTheme,
  Modal,
  ModalManager,
  ThemeProvider,
  Typography,
  useTheme,
  SimpleModal,
  TextField,
} from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  //   const top = 50 + rand();
  //   const left = 50 + rand();
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Post = ({
  handleLike,
  like,
  wassupText,
  likesCount,
  userName,
  allPosts,
  myPosts,
  handleReloadAfterWassupUpload,
  userEmail,
}) => {
  const wassupTextBeforeChange = wassupText;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [updateFieldText, setUpdateFieldText] = useState(wassupText);
  const { currentUser } = useAuth();
  const location = useLocation();

  const theme = createTheme({
    palette: {
      secondary: {
        main: "rgb(140,233,23)",
        dark: "#1db954",
      },
      primary: {
        main: "rgb(228,78,47)",
        dark: "#961b00",
      },
    },
  });

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = async () => {
    const docRef = doc(db, "users", currentUser.email);
    console.log(docRef);
    console.log("allPosts =>", myPosts);
    console.log("myPosts => ", myPosts);
    const localPosts = myPosts && myPosts.posts;
    const postToUpdate =
      localPosts &&
      localPosts.find((post) => post.text === wassupTextBeforeChange);
    if (postToUpdate) {
      postToUpdate.text = updateFieldText;
    }
    const mappedLocalPosts = localPosts.map((post) => {
      return { text: post.text, likes: post.likes };
    });
    console.log(mappedLocalPosts);
    try {
      console.log("try block");
      await updateDoc(docRef, {
        posts: localPosts,
      });
      toast.success("Update Succcessful");

      setOpen(false);
      // handleReloadAfterWassupUpload();

    } catch (e) {
      toast.warn("Update failed. Please retry");
    }

    // await updateDoc(docRef)
  };

  const handleWassupTextChange = (e) => {
    setUpdateFieldText(e.target.value);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box className={classes.wassuptextbox}>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-secondary"
            // label="Wassup?"
            variant="outlined"
            color="secondary"
            value={updateFieldText}
            type="text"
            multiline={true}
            placeholder="Wassup?"
            className={classes.textfield}
            onChange={handleWassupTextChange}
          />
        </ThemeProvider>
      </Box>
      <Box className={classes.wassuptextbox}>
        <ThemeProvider theme={theme}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleModalClose}
          >
            Update
          </Button>
        </ThemeProvider>
      </Box>
    </div>
  );

  //   const handleModalOpen = () => {};

  return (
    <Box className={classes.outerBox}>
      <Box>
        <Typography variant="h6" className={classes.username}>
          {userEmail === currentUser.email ? "You" : userName}
          {/* {userEmail===currentUser.email ? "You" : userName} */}
        </Typography>
      </Box>
      <Box>
        <Typography>{wassupText}</Typography>
      </Box>
      <Box>
        <Box className={classes.iconColor}>
          {!like ? (
            <FavoriteBorderIcon onClick={handleLike} />
          ) : (
            <FavoriteIcon onClick={handleLike} />
          )}
        </Box>
        <Box>{likesCount} Likes</Box>
      </Box>
      {
        // (currentUser.email === userEmail)
        location.pathname === "/my-posts" && (
          <Box className={classes.buttonsCover}>
            <Box>
              <ThemeProvider theme={theme}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleModalOpen}
                >
                  Update
                </Button>
              </ThemeProvider>
              <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </Box>

            <ThemeProvider theme={theme}>
              <Button color="primary" variant="contained">
                Delete
              </Button>
            </ThemeProvider>
          </Box>
        )
      }
    </Box>
  );
};

export default Post;
