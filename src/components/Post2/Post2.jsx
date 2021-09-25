import React, { useContext, useState } from "react";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import dateCustomizer from "../../utils/dateCustomizer";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import LikesPopUp from "../LikesPopUp/LikesPopUp";
import { Box } from "@material-ui/core";
import { ClickContext } from "../../contexts/ClickContext";

const Post2 = ({ post }) => {
  console.log(post?.text, post?.likedBy);
  const { closeDisplayPopUp } = useContext(ClickContext);
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );

  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);

  const classes = useStyles();
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [openUrlCopiedSnackBar, setOpenUrlCopiedSnackBar] =
    React.useState(false);

  const handleShareButtonSnackBarOpen = () => {
    setOpenUrlCopiedSnackBar(true);
  };

  const handleShareButtonSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenUrlCopiedSnackBar(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Everything related to Like

  const addToLikedPostsArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      let currentUserDocCopy = { ...prevState };
      if (currentUserDocCopy?.likedPosts?.indexOf(post.id) === -1) {
        currentUserDocCopy.likedPosts.push(post.id);
      }
      addToLikedPostsArrayInFirestore({ ...currentUserDocCopy });

      return { ...currentUserDocCopy };
    });
    console.log("addToLikedPostsArrayInCurrentUserDoc =>", currentUserDoc);
  };

  const addToLikedPostsArrayInAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      let allUserDocsCopy = [...allUserDocs];
      let docRef = allUserDocsCopy.find(
        (doc) => doc.username === currentUserDoc.username
      );
      if (docRef?.likedPosts?.indexOf(post.id) === -1) {
        docRef.likedPosts.push(post.id);
      }
      return [...allUserDocsCopy];
    });
  };

  const addToLikedPostsArrayInFirestore = async (currentUserDocCopy) => {
    const currentUserDocRef = doc(db, "users", currentUserDocCopy.email);

    await updateDoc(currentUserDocRef, {
      likedPosts: [...currentUserDocCopy.likedPosts],
    });
  };

  const removeFromLikedPostsArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      let currentUserDocCopy = { ...prevState };
      let modifiedLikedPosts = currentUserDocCopy?.likedPosts.filter((id) => {
        return id !== post.id;
      });
      currentUserDocCopy.likedPosts = [...modifiedLikedPosts];
      removeFromLikedPostsArrayInFirestore({ ...currentUserDocCopy });

      return { ...currentUserDocCopy };
    });

    console.log("removeFromLikedPostsArrayInCurrentUserDoc=>", currentUserDoc);
  };

  const removeFromLikedPostsArrayInAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      let allUserDocsCopy = [...prevState];
      let docToModify = allUserDocsCopy.find(
        (doc) => doc.email === currentUserDoc.email
      );
      let modifiedLikedPosts = docToModify.likedPosts.filter((id) => {
        return id !== post.id;
      });
      docToModify.likedPosts = [...modifiedLikedPosts];

      return [...allUserDocsCopy];
    });
  };

  const removeFromLikedPostsArrayInFirestore = async (currentUserDocCopy) => {
    const currentUserDocRef = doc(db, "users", currentUserDocCopy.email);

    await updateDoc(currentUserDocRef, {
      likedPosts: [...currentUserDocCopy.likedPosts],
    });
  };

  const addToLikedByArrayInFireStore = async (docToModify) => {
    console.log("docToModify.email", docToModify.email);
    console.log("docToModify.email", docToModify.posts);

    const currentUserDocRef = doc(db, "users", docToModify.email);

    await updateDoc(currentUserDocRef, {
      posts: [...docToModify.posts],
    });
  };

  const addToLikedByArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      const currentUserDocCopy = { ...prevState };
      const postToUpdate = currentUserDocCopy.posts.find(
        (eachPost) => eachPost.id === post.id
      );
      if (postToUpdate.likedBy.indexOf(currentUserDoc.email) === -1) {
        postToUpdate.likedBy.push(currentUserDocCopy?.email);
      }

      return { ...currentUserDocCopy };
    });
  };

  const addToLikedByArrayInAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      const allUserDocsCopy = [...prevState];
      const docToModify = allUserDocsCopy.find(
        (doc) => doc.email === post.email
      );
      const postToModify = docToModify.posts.find(
        (eachPost) => eachPost.id === post.id
      );
      if (postToModify.likedBy.indexOf(currentUserDoc.email) === -1) {
        postToModify.likedBy.push(currentUserDoc?.email);
        addToLikedByArrayInFireStore({ ...docToModify });
        // postToModify.likedBy.push("hello sir");
      }
      return [...allUserDocsCopy];
    });
  };

  const addToLikedPostsArray = () => {
    let likedPostsArray = [...currentUserDoc?.likedPosts];
    addToLikedPostsArrayInCurrentUserDoc();
    addToLikedPostsArrayInAllUserDocs();
    if (post.email === currentUserDoc.email) {
      addToLikedByArrayInCurrentUserDoc();
    }
    addToLikedByArrayInAllUserDocs();
    console.log(post.likedBy);
  };

  const removeFromLikedByArrayInFireStore = async (docToModify) => {
    console.log("docToModify.email", docToModify.email);
    console.log("docToModify.email", docToModify.posts);

    const currentUserDocRef = doc(db, "users", docToModify.email);

    await updateDoc(currentUserDocRef, {
      posts: [...docToModify.posts],
    });
  };

  const removeFromLikedByArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      const currentUserDocCopy = { ...prevState };
      const postToUpdate = currentUserDocCopy.posts.find(
        (eachPost) => eachPost.id === post.id
      );
      const indexOfUserEmail = postToUpdate.likedBy.indexOf(
        currentUserDoc.email
      );
      if (indexOfUserEmail !== -1) {
        postToUpdate.likedBy.splice(indexOfUserEmail, 1);
      }

      return { ...currentUserDocCopy };
    });
  };

  const removeFromLikedByArrayInAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      const allUserDocsCopy = [...prevState];
      const docToModify = allUserDocsCopy.find(
        (doc) => doc.email === post.email
      );
      const postToModify = docToModify.posts.find(
        (eachPost) => eachPost.id === post.id
      );
      // if (postToModify.likedBy.indexOf(currentUserDoc.email) === -1) {
      //   postToModify.likedBy.push(currentUserDoc?.email);
      //   addToLikedByArrayInFireStore({...docToModify});
      //   // postToModify.likedBy.push("hello sir");

      // }
      const indexOfCurrentUserEmail = postToModify?.likedBy?.indexOf(
        currentUserDoc.email
      );
      if (indexOfCurrentUserEmail !== -1) {
        postToModify.likedBy.splice(indexOfCurrentUserEmail, 1);
        removeFromLikedByArrayInFireStore({ ...docToModify });
      }
      return [...allUserDocsCopy];
    });
  };

  const removeFromLikedPostsArray = () => {
    removeFromLikedPostsArrayInCurrentUserDoc();
    removeFromLikedPostsArrayInAllUserDocs();
    if (post.email === currentUserDoc.email) {
      removeFromLikedByArrayInCurrentUserDoc();
    }
    removeFromLikedByArrayInAllUserDocs();
  };

  const handleLike = () => {

    setLike(true);
    handlePostLikedSnackbar();
    addToLikedPostsArray();
  };

  const handleDislike = () => {
    setLike(false);
    setPostDislikedSnackbar(prevState => !prevState)
    removeFromLikedPostsArray();
  };

  const checkIfPostInLikedPosts = () => {
    if (currentUserDoc?.likedPosts?.includes(post?.id)) {
      return <FavoriteIcon onClick={handleDislike} color="primary" />;
    } else {
      return <FavoriteBorderIcon onClick={handleLike} color="primary" />;
    }
  };

  // Everything related to like ends here

  // Everything related to save starts here

  const addToSavedPostsArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      let currentUserDocCopy = { ...prevState };
      if (currentUserDocCopy?.savedPosts?.indexOf(post.id) === -1) {
        currentUserDocCopy.savedPosts.push(post.id);
      }
      addToSavedPostsArrayInFirestore({ ...currentUserDocCopy });

      return { ...currentUserDocCopy };
    });
    console.log("addToSavedPostsArrayInCurrentUserDoc =>", currentUserDoc);
  };

  const addToSavedPostsArrayInAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      let allUserDocsCopy = [...allUserDocs];
      let docRef = allUserDocsCopy.find(
        (doc) => doc.username === currentUserDoc.username
      );
      if (docRef?.savedPosts?.indexOf(post.id) === -1) {
        docRef.savedPosts.push(post.id);
      }
      return [...allUserDocsCopy];
    });
  };

  const addToSavedPostsArrayInFirestore = async (currentUserDocCopy) => {
    const currentUserDocRef = doc(db, "users", currentUserDocCopy.email);

    await updateDoc(currentUserDocRef, {
      savedPosts: [...currentUserDocCopy.savedPosts],
    });
  };

  const removeFromSavedPostsArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      let currentUserDocCopy = { ...prevState };
      let modifiedSavedPosts = currentUserDocCopy?.savedPosts.filter((id) => {
        return id !== post.id;
      });
      currentUserDocCopy.savedPosts = [...modifiedSavedPosts];
      removeFromSavedPostsArrayInFirestore({ ...currentUserDocCopy });

      return { ...currentUserDocCopy };
    });

    console.log("removeFromSavedPostsArrayInCurrentUserDoc=>", currentUserDoc);
  };

  const removeFromSavedPostsArrayInAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      let allUserDocsCopy = [...prevState];
      let docToModify = allUserDocsCopy.find(
        (doc) => doc.email === currentUserDoc.email
      );
      let modifiedSavedPosts = docToModify.savedPosts.filter((id) => {
        return id !== post.id;
      });
      docToModify.savedPosts = [...modifiedSavedPosts];

      return [...allUserDocsCopy];
    });
  };

  const removeFromSavedPostsArrayInFirestore = async (currentUserDocCopy) => {
    const currentUserDocRef = doc(db, "users", currentUserDocCopy.email);

    await updateDoc(currentUserDocRef, {
      savedPosts: [...currentUserDocCopy.savedPosts],
    });
  };

  const addToSavedPostsArray = () => {
    let SavedPostsArray = [...currentUserDoc?.likedPosts];
    addToSavedPostsArrayInCurrentUserDoc();
    addToSavedPostsArrayInAllUserDocs();
  };

  const removeFromSavedPostsArray = () => {
    removeFromSavedPostsArrayInCurrentUserDoc();
    removeFromSavedPostsArrayInAllUserDocs();
  };

  const handleSave = () => {
    setSave(true);
    handlePostSavedSnackBar()
    addToSavedPostsArray();
  };

  const handleUnsave = () => {
    setSave(false);
    handlePostUnsavedSnackBar();
    removeFromSavedPostsArray();
  };

  const checkIfPostInSavedPosts = () => {
    if (currentUserDoc?.savedPosts?.includes(post?.id)) {
      return <BookmarkIcon onClick={handleUnsave} color="primary" />;
    } else {
      return <BookmarkBorderIcon onClick={handleSave} color="primary" />;
    }
  };

  const checkIfUserHasAvatar = () => {
    const docOfThePostOwner = allUserDocs?.find(
      (doc) => doc?.email === post?.email
    );
    if (docOfThePostOwner?.avatarUrl) {
      return (
        <Avatar className={classes.avatar} src={docOfThePostOwner.avatarUrl} />
      );
    } else {
      return (
        <Avatar aria-label="recipe" className={classes.avatar}>
          {post?.username[0].toUpperCase()}
        </Avatar>
      );
    }
  };

  const removePostFromCurrentUserDocs = () => {
    console.log(currentUserDoc?.posts?.length);

    setCurrentUserDoc((prevState) => {
      const currentUserDocsCopy = { ...prevState };
      const postToDelete = currentUserDocsCopy?.posts?.find(
        (eachPost) => eachPost.id === post.id
      );
      const indexOfPostToDelete =
        currentUserDocsCopy.posts.indexOf(postToDelete);
      if (indexOfPostToDelete !== -1) {
        currentUserDocsCopy.posts.splice(indexOfPostToDelete, 1);
      }
      return { ...currentUserDocsCopy };
    });
    console.log(currentUserDoc?.posts?.length);
  };
  const removePostFromAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      const allUserDocsCopy = [...allUserDocs];
      const docToModify = allUserDocsCopy.find(
        (doc) => doc.username === currentUserDoc.username
      );
      const postToDelete = docToModify.posts.find(
        (eachPost) => eachPost.id === post.id
      );
      const indexOfPostToDelete = docToModify.posts.indexOf(postToDelete);
      if (indexOfPostToDelete !== -1) {
        docToModify.posts.splice(indexOfPostToDelete, 1);
      }
      return [...allUserDocs];
    });
  };
  const removePostFromFirestore = async () => {
    const currentUserDocRef = doc(db, "users", currentUserDoc.email);

    await updateDoc(currentUserDocRef, {
      posts: arrayRemove(post),
    });
  };

  const handlePostDelete = () => {
    removePostFromCurrentUserDocs();
    removePostFromAllUserDocs();
    removePostFromFirestore();
  };

  const handleCopyImageUrl = () => {
    navigator.clipboard.writeText(post.imageUrl);
    handleShareButtonSnackBarOpen();
  };

  const findAvatarUrl = (item) => {
    const docOfTheLikedUser = allUserDocs.find((doc) => doc.email === item);
    return docOfTheLikedUser?.avatarUrl;
  };

  const findAlt = (item) => {
    const docOfTheLikedUser = allUserDocs.find((doc) => doc.email === item);
    return docOfTheLikedUser?.username;
  };

  // const [likesPopUp, setLikesPopUp] = useState(false)

  const [openLikesPopUp, setOpenLikesPopUp] = React.useState(false);

  const handleOpenLikesPopUp = () => {
    setOpenLikesPopUp(true);
  };

  const handleCloseLikesPopUp = () => {
    setOpenLikesPopUp(false);
  };

  const handleLikesPopUp = () => {
    setOpenLikesPopUp((prevState) => !prevState);
  };

  const [postLikedSnackbar, setPostLikedSnackbar] = useState(false)
  
  const handlePostLikedSnackbar = () => {
    setPostLikedSnackbar(prevState => !prevState)
  }

  const [postDislikedSnackbar, setPostDislikedSnackbar] = useState(false);
  
  const [postSavedSnackbar, setPostSavedSnackbar] = useState(false);

  const handlePostSavedSnackBar = () => {
    setPostSavedSnackbar(p => !p);
  }

  const [postUnsavedSnackbar, setPostUnsavedSnackbar] = useState(false);

  const handlePostUnsavedSnackBar = () =>{
    setPostUnsavedSnackbar(p => !p)
  }

  return (
    <Box className={classes.postField} onClick={(e) => closeDisplayPopUp(e)}>
      <Card className={classes.root}>
        <CardHeader
          avatar={checkIfUserHasAvatar()}
          action={
            <>
              {post?.email === currentUserDoc.email && (
                <IconButton onClick={handlePostDelete}>
                  <DeleteForeverIcon />
                </IconButton>
              )}
              {/* <IconButton aria-label="settings">
                <MoreVertIcon color="primary" />
              </IconButton> */}
            </>
          }
          title={
            <Typography
              dangerouslySetInnerHTML={{
                __html:
                  post?.username === currentUserDoc.username
                    ? "You"
                    : post?.username,
              }}
              variant="h6"
              component={Link}
              to={`/profile/${post?.username}`}
              className={classes.postUsername}
            />
          }
          // subheader={`${post.date.toDate().getDate()}/${
          //   post.date.toDate().getMonth() + 1
          // }/${post.date.toDate().getFullYear()}`}
          subheader={dateCustomizer(post?.date)}
        />
        {post?.imageUrl && (
          <CardMedia
            className={classes.media}
            image={post?.imageUrl}
            title={post?.username}
          />
        )}

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post?.text}
          </Typography>
        </CardContent>

        <CardContent>
          {post?.likedBy.length === 0 ? (
            <Typography variant="body2" className={classes.likesText}>
              Be the first one to like this post!{" "}
            </Typography>
          ) : (
            <AvatarGroup max={4} onClick={handleOpenLikesPopUp}>
              <Typography variant="body2" className={classes.likesText}>
                Liked By{" "}
              </Typography>
              {"   "}
              {post?.likedBy.map((item) => (
                <Avatar
                  alt={findAlt(item)}
                  src={findAvatarUrl(item)}
                  className={classes.smallAvatar}
                />
              ))}
            </AvatarGroup>
          )}
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {checkIfPostInLikedPosts()}
          </IconButton>
          <IconButton aria-label="add to saved">
            {checkIfPostInSavedPosts()}
          </IconButton>
          {post?.imageUrl && (
            <IconButton aria-label="share" onClick={handleCopyImageUrl}>
              <ShareIcon color="primary" />
            </IconButton>
          )}
          {/* <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton> */}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2">{post?.text}</Typography>
          </CardContent>
        </Collapse>
      </Card>
      {openLikesPopUp && (
        <LikesPopUp
          handleCloseLikesPopUp={handleCloseLikesPopUp}
          likedBy={post?.likedBy}
          handleOpenLikesPopUp={handleOpenLikesPopUp}
          openLikesPopUp={openLikesPopUp}
        />
      )}
      <Snackbar
        open={openUrlCopiedSnackBar}
        autoHideDuration={1000}
        onClose={handleShareButtonSnackBarClose}
      >
        <Alert onClose={handleShareButtonSnackBarClose} severity="success">
          Image URL copied!
        </Alert>
      </Snackbar>

      <Snackbar open={postLikedSnackbar} autoHideDuration={1000} onClose={handlePostLikedSnackbar}>
        <Alert onClose={handlePostLikedSnackbar} severity="success">
          Post Liked
        </Alert>
      </Snackbar>

      <Snackbar open={postDislikedSnackbar} autoHideDuration={1000} onClose={() => setPostDislikedSnackbar(prevState => !prevState)}>
        <Alert onClose={() => setPostDislikedSnackbar(prevState => !prevState)} severity="error">
          Post Disliked
        </Alert>
      </Snackbar>

      <Snackbar open={postSavedSnackbar} autoHideDuration={1000} onClose={handlePostSavedSnackBar}>
        <Alert onClose={handlePostSavedSnackBar} severity="success">
          Post Saved
        </Alert>
      </Snackbar>

      <Snackbar open={postUnsavedSnackbar} autoHideDuration={1000} onClose={handlePostUnsavedSnackBar}>
        <Alert onClose={handlePostUnsavedSnackBar} severity="error">
          Post Unsaved
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Post2;
