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
  getDoc,
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
  // handleLike,
  // like,
  wassupText,
  likesCount,
  userName,
  allPosts,
  myPosts,
  handleAllPostsUpdateDeleteOptimistically,
  userEmail,
  date,
}) => {
  const wassupTextBeforeChange = wassupText;
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [updateFieldText, setUpdateFieldText] = useState(wassupText);
  const { currentUser } = useAuth();
  const location = useLocation();
  const [like, setLike] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(likesCount);

  console.log("myPosts in post => ", myPosts);

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
    const localPosts = myPosts && myPosts.posts;
    console.log(localPosts);
    const postToUpdate =
      localPosts &&
      localPosts.find((post) => post.text === wassupTextBeforeChange);
    if (postToUpdate) {
      postToUpdate.text = updateFieldText;
      // postToUpdate.date = new Date();
    }
    const mappedLocalPosts = localPosts.map((post) => {
      return { text: post.text, likes: post.likes, date: post.date };
    });

    try {
      handleAllPostsUpdateDeleteOptimistically(
        mappedLocalPosts,
        currentUser.email
      );
      setOpen(false);
      // throw new Error();
      await updateDoc(docRef, {
        posts: mappedLocalPosts,
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
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    const docRef = doc(db, "users", userEmail);

    const localPosts = myPosts.posts;

    const filteredPosts = localPosts.filter((post) => post.text !== wassupText);
    try {
      handleAllPostsUpdateDeleteOptimistically(
        filteredPosts,
        currentUser.email
      );
      setOpenDelete(false);

      await updateDoc(docRef, {
        posts: filteredPosts,
      });
      toast.success("Deleted Post!");

      // handleReloadAfterWassupUpload();
    } catch (e) {
      handleAllPostsUpdateDeleteOptimistically(localPosts, currentUser.email);
      setOpenDelete(false);
      toast.warn("Failed to Delete. Please retry!");
    }
  };

  const bodyDelete = (
    <div style={modalStyle} className={classes.paper}>
      {/* <Box className={classes.deleteModalText}> */}
      <Typography variant="h5" align="center">
        Are you sure want to delete?
      </Typography>
      {/* </Box> */}
      <Box className={classes.deleteModalButtons}>
        <ThemeProvider theme={theme}>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Yes
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            onClick={() => setOpenDelete(false)}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </ThemeProvider>
      </Box>
    </div>
  );

  const handleLike = async (e) => {
    if (!like) {
      setLocalLikeCount(localLikeCount+1);
      setLike(true);
    } else {
      setLocalLikeCount(localLikeCount-1);
      setLike(false);
    }

    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    } else {
      console.log("No such document!");
    }

    let posts = docSnap.data().posts;
    posts.forEach((post) => {
      if (post.text === wassupText) {
        post.likes = post.likes + 1;
      }
    });
    try {
      await updateDoc(doc(db, "users", userEmail), {
        posts,
      });
    } catch (e) {
      console.log(e);
    }

    console.log(posts);
  };

  const handlePostUserName = () => {
    if(currentUser){
    return (userEmail === currentUser.email ? "You" : userName)
    }
  }

  return (
    <Box className={classes.outerBox}>
      <Box className={classes.userAndTime}>
        <Box>
          <Typography
            variant="h6"
            className={classes.username}
            display="inline"
          >
            {userEmail && handlePostUserName()}
            {/* {userEmail===currentUser.email ? "You" : userName} */}
          </Typography>
        </Box>
        {/* <Box>
          <Typography display="inline" variant="body2">{date.toString()}</Typography>
        </Box> */}
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
        <Box>{localLikeCount} Likes</Box>
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
            <Box>
              <ThemeProvider theme={theme}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleOpenDelete}
                >
                  Delete
                </Button>
              </ThemeProvider>
              <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {bodyDelete}
              </Modal>
            </Box>
          </Box>
        )
      }
    </Box>
  );
};

export default Post;
