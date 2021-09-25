import React, { useContext, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import useStyles from "./styles";
import { Card, Button, IconButton, Avatar, createTheme, ThemeProvider, Snackbar } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { PhotoCamera } from "@material-ui/icons";
import LinearIndeterminate from "../LinearIndeterminate/LinearIndeterminate";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Alert } from "@material-ui/lab";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const theme = createTheme({
  palette: {
    secondary: {
      main: "rgb(107,187,117)",
      dark: "rgb(0, 171, 107)",
    },
  },
});


export default function EditProfileModal({ open, handleOpen, handleClose,handleLinearIndeterminate }) {
  let history = useHistory();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);

  const [modalUsername, setModalUsername] = useState(currentUserDoc?.username);
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const usernameRef = useRef();
  const bioRef = useRef();
  const [avatarImage, setAvatarImage] = useState(null);

  const [editProfileSnackbar, setEditProfileSnackbar] = useState(false);
  const handleEditProfileSnackbar = () => {
    setEditProfileSnackbar(p => !p);
  }

  const handleAvatarImageChange = (e) => {
    e.target.files[0] && setAvatarImage(e.target.files[0]);
    console.log("avatarImage => ", avatarImage);
  };

  const editProfileDisabled = () => {
    return false;
  };

  const handleUserNameChange = () => {
    if (usernameRef.current.value === "") {
      setUsernameHelperText("username cannot be empty!");
    }
    if (usernameRef.current.value.length > 30) {
      setUsernameHelperText("username cannot be longer than 30 characters!");
    }
    if (
      usernameRef.current.value !== "" &&
      usernameRef.current.value.length < 30
    ) {
      setUsernameHelperText("");
    }
  };

  const updateDetailsInCurrentUserDoc = () => {
    setCurrentUserDoc((prevState) => {
      let currentUserDocCopy = { ...prevState };
      currentUserDocCopy["username"] = usernameRef?.current?.value;
      currentUserDocCopy["bio"] = bioRef?.current?.value;
      return { ...currentUserDocCopy };
    });
  };

  const updateDetailsInAllUserDocs = () => {
    setAllUserDocs((prevState) => {
      let allUserDocsCopy = [...prevState];
      const currentUserDocReference = allUserDocsCopy.find(
        (doc) => doc.username === currentUserDoc.username
      );
      console.log("currentUserDocReference=>", currentUserDocReference);
      currentUserDocReference["username"] = usernameRef?.current?.value;
      currentUserDocReference["bio"] = bioRef?.current?.value;
      return [...allUserDocs];
    });
  };

  const updateDetailsInFirestore = async () => {
    const currentUserDocRef = doc(db, "users", currentUserDoc.email);

    await updateDoc(currentUserDocRef, {
      username: usernameRef?.current?.value,
      bio: bioRef?.current?.value,
    });
  };

  const addAvatarUrlInCurrentUserDoc = (downloadUrl) => {
    setCurrentUserDoc((prevState) => {
      const currentUserDocCopy = { ...prevState };
      currentUserDocCopy.avatarUrl = downloadUrl;
      return { ...currentUserDocCopy };
    });
  };

  const addAvatarUrlInAllUserDocs = (downloadURL) => {
      

      setAllUserDocs(prevState => {
        const allUserDocsCopy = [...prevState];
        const currentDocRef =  allUserDocsCopy.find(doc => doc.email === currentUserDoc.email);
        currentDocRef.avatarUrl = downloadURL;
        return allUserDocsCopy;
      })
  };
  const addAvatarUrlToFirestore = async (downloadURL) => {
    const currentUserDocRef = doc(db, "users", currentUserDoc.email);

    await updateDoc(currentUserDocRef, {
      avatarUrl : downloadURL
    });
  };

  const handlePostToFireStorage = async () => {
    const file = avatarImage;
    if (avatarImage) {
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      handleLinearIndeterminate();
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
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;

            // ...

            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            addAvatarUrlInCurrentUserDoc(downloadURL);
            addAvatarUrlInAllUserDocs(downloadURL);
            addAvatarUrlToFirestore(downloadURL);
            handleLinearIndeterminate();

          });
        }
      );
    }
    handleEditProfileSnackbar();

  };

  const handleProfileChangesSave = () => {
    console.log("handleProfileChangesSave");
    console.log(usernameRef.current.value);
    console.log(bioRef.current.value);

    updateDetailsInCurrentUserDoc();
    updateDetailsInAllUserDocs();
    updateDetailsInFirestore();
    handlePostToFireStorage();
    handleClose();

    history.push(`/profile/${usernameRef.current.value}`);
  };

  const body = (
    <ThemeProvider theme={theme}>
    <Card className={classes.card}>
      <input
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleAvatarImageChange}
      />
      <label htmlFor="icon-button-file" className={classes.avatarUrlChange}>
      <ThemeProvider theme={theme}>

      <Avatar src={currentUserDoc.avatarUrl}/>
        <IconButton
          color="secondary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
        {avatarImage?.name}
        </ThemeProvider>
      </label>


      

      {/* <Avatar src={currentUserDoc.avatarUrl}/> */}

      <TextField
        id="outlined-helperText"
        label="username"
        defaultValue={currentUserDoc?.username}
        helperText={usernameHelperText}
        variant="outlined"
        inputRef={usernameRef}
        onChange={handleUserNameChange}
        InputProps={{
          readOnly: true,
        }}
        color="secondary"
      />

      <TextField
        id="outlined-multiline-flexible"
        label="Bio"
        defaultValue={currentUserDoc.bio}
        multiline
        maxRows={4}
        //   value={value}
        //   onChange={handleChange}
        variant="outlined"
        inputRef={bioRef}
        color="secondary"

      />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        disabled={editProfileDisabled()}
        // component={Link}
        // to={`/profile/${usernameRef?.current?.value}`}
        onClick={handleProfileChangesSave}
      >
        Save And Close
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        // component={Link}
        // to={`/profile/${usernameRef?.current?.value}`}
        onClick={handleClose}
      >
        Cancel
      </Button>
    </Card>
    </ThemeProvider>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Snackbar open={editProfileSnackbar} autoHideDuration={1000} onClose={handleEditProfileSnackbar}>
        <Alert onClose={handleEditProfileSnackbar} severity="success">
Changes Saved!
        </Alert>
      </Snackbar>    </div>
  );
}
