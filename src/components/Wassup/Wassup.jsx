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

  const checkIfImageOrTextBoxIsEmpty = () => {
    if (wassupText === "" && wassupImage === null) {
      return true;
    }
    return false;
  };
  const theme = createTheme({
    palette: {
      secondary: {
        main: "rgb(140,233,23)",
        dark: "#1db954",
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

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

    // posting description, imageUrl, postDate to firestore---------------------------
  };

  // const handlePostToFirestore = async () => {
  //   const usersDocRef = doc(db, "users", currentUser.email);

  //   try {
  //     let localRef = allPosts.find((post) => currentUser.email === post.email);
  //     let localRefSpread = [...localRef.posts];

  //     localRefSpread.push({
  //       text: wassupText,
  //       likes: 0,
  //       date: new Date(),
  //     });
  //     console.log("lala lala=>", localRefSpread);
  //     handleAllPostsUpdateDeleteOptimistically(
  //       localRefSpread,
  //       currentUser.email
  //     );
  //     await updateDoc(usersDocRef, {
  //       posts: arrayUnion({ text: wassupText, likes: 0, date: new Date() }),
  //     });
  //     setWassupText("");
  //     // handleReloadAfterWassupUpload();e

  //     toast.success("Posted successfully");
  //   } catch (e) {
  //     toast.warn("Couldn't post at the moment. Please retry after sometime!");
  //   }
  // };

  return (
    <>
      <Box className={classes.mainOuterBox}>
        <Box className={classes.outerBox}>
          <Box>
            <Box className={classes.wassuptextbox}>
              <ThemeProvider theme={theme}>
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
              </ThemeProvider>
            </Box>

            <Box
              onClick={handlePostToFireStorage}
              className={classes.postButton}
            >
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={checkIfImageOrTextBoxIsEmpty()}
                >
                  POST
                </Button>
              </ThemeProvider>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Wassup;
