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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Post2 = ({ post }) => {
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );

  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);

  const classes = useStyles();
  const [like, setLike] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToLikedPostsArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      let currentUserDocCopy = { ...prevState };
      if (currentUserDocCopy?.likedPosts?.indexOf(post.id) === -1) {
        currentUserDocCopy.likedPosts.push(post.id);
      }
      addToLikedPostsArrayInFirestore({...currentUserDocCopy});

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
      removeFromLikedPostsArrayInFirestore({...currentUserDocCopy});

      return { ...currentUserDocCopy };
    });

    console.log("removeFromLikedPostsArrayInCurrentUserDoc=>", currentUserDoc);
  };

  const removeFromLikedPostsArrayInAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      let allUserDocsCopy = [...prevState];
      let docToModify = allUserDocsCopy.find((doc) => doc.email === currentUserDoc.email);
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
  }


  const addToLikedPostsArray = () => {
    let likedPostsArray = [...currentUserDoc?.likedPosts]
    addToLikedPostsArrayInCurrentUserDoc();
    addToLikedPostsArrayInAllUserDocs();
    
  };

  const removeFromLikedPostsArray = () => {
    removeFromLikedPostsArrayInCurrentUserDoc();
    removeFromLikedPostsArrayInAllUserDocs();

  };

  const handleLike = () => {
    setLike(true);
    addToLikedPostsArray();
  };

  const handleDislike = () => {
    setLike(false);
    removeFromLikedPostsArray();
  };

  const checkIfPostInLikedPosts = () =>{
    if(currentUserDoc?.likedPosts?.includes(post.id)){
        return (<FavoriteIcon onClick={handleDislike} />)
    }
    else{
      return (<FavoriteBorderIcon onClick={handleLike} />)
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          post?.username === currentUserDoc.username ? "You" : post.username
        }
        // subheader={`${post.date.toDate().getDate()}/${
        //   post.date.toDate().getMonth() + 1
        // }/${post.date.toDate().getFullYear()}`}
      />
      <CardMedia
        className={classes.media}
        image={post.imageUrl}
        title={post.username}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.text}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {checkIfPostInLikedPosts()}
          
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">{post.text}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post2;

// referenceOfCurrentUserDocInAllUserDocsCopy = {...localCurrentUserDocRef}
// console.log("referenceOfCurrentUserDocInAllUserDocsCopy=>",referenceOfCurrentUserDocInAllUserDocsCopy);

// let currentUserDocRefInAllUserDocsCopy = localAllUserDocsCopy.find(doc => doc.username === currentUserDoc.username);
// currentUserDocRefInAllUserDocsCopy = {...localCurrentUserDocRef};
// console.log("heyo bruh=>", currentUserDocRefInAllUserDocsCopy);
// console.log("heyyyo bro=>",localAllUserDocsCopy)
// setAllUserDocs([...localAllUserDocsCopy]);
// console.log("alllll user docs => ", allUserDocs)
