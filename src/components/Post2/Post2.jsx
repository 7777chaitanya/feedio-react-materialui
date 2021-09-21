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
import dateCustomizer from "../../utils/dateCustomizer";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {Link} from "react-router-dom"

const Post2 = ({ post }) => {
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );

  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);

  const classes = useStyles();
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

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

  // Everything related to like ends here

  // Everything related to save starts here

  const addToSavedPostsArrayInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      let currentUserDocCopy = { ...prevState };
      if (currentUserDocCopy?.savedPosts?.indexOf(post.id) === -1) {
        currentUserDocCopy.savedPosts.push(post.id);
      }
      addToSavedPostsArrayInFirestore({...currentUserDocCopy});

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
      removeFromSavedPostsArrayInFirestore({...currentUserDocCopy});

      return { ...currentUserDocCopy };
    });

    console.log("removeFromSavedPostsArrayInCurrentUserDoc=>", currentUserDoc);
  };

  const removeFromSavedPostsArrayInAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      let allUserDocsCopy = [...prevState];
      let docToModify = allUserDocsCopy.find((doc) => doc.email === currentUserDoc.email);
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
  }

  const addToSavedPostsArray = () => {
    let SavedPostsArray = [...currentUserDoc?.likedPosts]
    addToSavedPostsArrayInCurrentUserDoc();
    addToSavedPostsArrayInAllUserDocs();
    
  };

  const removeFromSavedPostsArray = () => {
    removeFromSavedPostsArrayInCurrentUserDoc();
    removeFromSavedPostsArrayInAllUserDocs();

  };

  const handleSave = () => {
    setSave(true);
    addToSavedPostsArray();
  };

  const handleUnsave = () => {
    setSave(false);
    removeFromSavedPostsArray();
  };

  const checkIfPostInSavedPosts = () =>{
    if(currentUserDoc?.savedPosts?.includes(post.id)){
      return (<BookmarkIcon onClick={handleUnsave} />)
  }
  else{
    return (<BookmarkBorderIcon onClick={handleSave} />)
  }
  }

  const checkIfUserHasAvatar = () => {
    const docOfThePostOwner = allUserDocs?.find(doc => doc?.email === post?.email);
    if(docOfThePostOwner?.avatarUrl){
      return (
        <Avatar className={classes.avatar} src={docOfThePostOwner.avatarUrl}/>
      )
    }
    else{
      return (<Avatar aria-label="recipe" className={classes.avatar}>
      {post?.username[0].toUpperCase()}
    </Avatar>)
    }
  }



  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={ checkIfUserHasAvatar() }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography dangerouslySetInnerHTML={{ __html: post?.username === currentUserDoc.username ? "You" : post.username }} variant="h6" component={Link} to={`/profile/${post.username}`} className={classes.postUsername} />
        }
        // subheader={`${post.date.toDate().getDate()}/${
        //   post.date.toDate().getMonth() + 1
        // }/${post.date.toDate().getFullYear()}`}
        subheader={dateCustomizer(post.date)}
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
        <IconButton aria-label="add to saved">
          {checkIfPostInSavedPosts()}
          
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
