import { Avatar, Box, Button, IconButton, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useRef, useState } from "react";
import useStyles from "./styles";
import { PhotoCamera } from "@material-ui/icons";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { db, storage } from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { ClickContext } from "../../contexts/ClickContext";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
        }

const Wassup = ({
  currentUser,
  handleAllPostsUpdateDeleteOptimistically,
  allPosts,
  handleDummy,
}) => {
  //   const wassupRef = useRef();
  const classes = useStyles();
  const [wassupText, setWassupText] = useState("");
  const [wassupImage, setWassupImage] = useState(null);
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const [progressBar, setProgressBar] = useState(null);
  const [showProgressBar, setshowProgressBar] = useState(false);
  const {closeDisplayPopUp} =  useContext(ClickContext)

  const checkIfImageOrTextBoxIsEmpty = () => {
    if (wassupText === "" && wassupImage === null) {
      return true;
    }
    return false;
  };
  const theme = createTheme({
    palette: {
      secondary: {
        main: "rgb(107,187,117)",
        dark: "rgb(0, 171, 107)",
      },
    },
  });

  const handleWassupTextChange = (e) => {
    setWassupText(e.target.value);
  };

  const handleWassupImageChange = (e) => {
    e.target.files[0] && setWassupImage(e.target.files[0]);
  };

  const handlePostToFireStore = async (inputObj) => {
    const currentUserDocRefInFirestore = doc(
      db,
      "users",
      currentUserDoc?.email
    );
    try {
      await updateDoc(currentUserDocRefInFirestore, {
        posts: [...currentUserDoc?.posts],
      });
    } catch (e) {
      console.log("error =>", e);
    }
  };

  const handlePostToFireStorage = async () => {
    const postObj = {};
    // console.log(wassupImage.name);
    // console.log(wassupText);
    const file = wassupImage;

    // posting image to firestore--------------------------------------------
    if (wassupImage) {
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setshowProgressBar(true);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
            setProgressBar(progress)
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setshowProgressBar(false);

            console.log("File available at", downloadURL);
            postObj.imageUrl = downloadURL;
            postObj.likes = 0;
            postObj.text = wassupText;
            postObj.date = new Date();
            postObj.username = currentUserDoc.username;
            postObj.email = currentUserDoc.email;
            postObj.likedBy = [];
            postObj.id = `${currentUserDoc.email}${postObj.date.toString()}`;
            postObj.avatarUrl = currentUserDoc.avatarUrl;
            // console.log("postObbj =>", postObj);

            setCurrentUserDoc((prevState) => {
              //  prevState?.posts?.push(postObj)
              const localCurrentUserDocRef = { ...prevState };
              localCurrentUserDocRef.posts.push(postObj);
              return { ...localCurrentUserDocRef };
            });
            console.log("currentUserDoc after state update=> ", currentUserDoc);
            setAllUserDocs((prevState) => {
              const localAllDocsRef = [...prevState];
              const currentUserDocToChange = localAllDocsRef.find(
                (doc) => doc.email === currentUserDoc.email
              );
              currentUserDocToChange?.posts?.push(postObj);
              // console.log("localAllDocsRef => ", localAllDocsRef);
              return localAllDocsRef;
            });
            console.log("allUserDocs after state update => ", allUserDocs);
            handlePostToFireStore({ ...postObj });
          });
        }
      );
    } else {
      postObj.likes = 0;
      postObj.text = wassupText;
      postObj.date = new Date();
      postObj.username = currentUserDoc.username;
      postObj.email = currentUserDoc.email;
      postObj.likedBy = [];
      postObj.id = `${currentUserDoc.email}${postObj.date.toString()}`;
      postObj.avatarUrl = currentUserDoc.avatarUrl;

      console.log("postObbj else =>", postObj);

      setCurrentUserDoc((prevState) => {
        //  prevState?.posts?.push(postObj)
        const localCurrentUserDocRef = { ...prevState };
        localCurrentUserDocRef.posts.push(postObj);
        return { ...localCurrentUserDocRef };
      });
      console.log("currentUserDoc after state update => ", currentUserDoc);
      setAllUserDocs((prevState) => {
        const localAllDocsRef = [...prevState];
        const currentUserDocToChange = localAllDocsRef.find(
          (doc) => doc.email === currentUserDoc.email
        );
        currentUserDocToChange.posts.push(postObj);
        // console.log("localAllDocsRef => ", localAllDocsRef);
        return localAllDocsRef;
      });
      console.log("allUserDocs after state update  => ", allUserDocs);
      handlePostToFireStore({ ...postObj });
     
    }
    setWassupText("");
    setWassupImage(null);

  };

 

  return (
    <Box onClick={closeDisplayPopUp}>
      <Box className={classes.mainOuterBox} >
        <Box className={classes.outerBox}>
          <Box>
            <Box className={classes.wassuptextbox}>
              {/* <ThemeProvider theme={theme}> */}
                <input
                  type="file"
                  id="icon-button-file"
                  className={classes.imageBox}
                  onChange={handleWassupImageChange}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton> 
                  {wassupImage?.name}
                </label>
                <TextField
                  id="outlined-secondary"
                  // label="Wassup?"
                  variant="outlined"
                  color="secondary"
                  value={wassupText}
                  type="text"
                  multiline={true}
                  placeholder="Wassup?"
                  className={classes.textfield}
                  onChange={handleWassupTextChange}
                />
              {/* </ThemeProvider> */}
            </Box>

            <Box
              className={classes.postButton}
            >
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={checkIfImageOrTextBoxIsEmpty()}
                  onClick={handlePostToFireStorage}

                >
                  POST
                </Button>
              </ThemeProvider>
              


            </Box>
          </Box>
        
        </Box>
      </Box>
      {showProgressBar &&
             ( <Box className={classes.progressBar}>
              <LinearProgressWithLabel value={progressBar} />
              </Box>)
}
    </Box>
  );
};

export default Wassup;
