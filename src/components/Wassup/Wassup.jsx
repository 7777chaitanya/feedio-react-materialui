import { Avatar, Box, Button, IconButton, TextField } from "@material-ui/core";
import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useRef, useState } from "react";
import useStyles from "./styles";
import { PhotoCamera } from "@material-ui/icons";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../firebase";

const Wassup = ({
  currentUser,
  handleAllPostsUpdateDeleteOptimistically,
  allPosts,
}) => {
  //   const wassupRef = useRef();
  const classes = useStyles();
  const [wassupText, setWassupText] = useState("");
  const [wassupImage, setWassupImage] = useState(null);
  console.log("wassup image bro => ", wassupImage);

  const theme = createTheme({
    palette: {
      secondary: {
        main: "rgb(140,233,23)",
        dark: "#1db954",
      },
    },
  });

  console.log("wassup text =>", wassupText);

  const handleWassupTextChange = (e) => {
    setWassupText(e.target.value);
  };

  const handleWassupImageChange = (e) => {
    e.target.files[0] && setWassupImage(e.target.files[0]);
  };

  const handlePostToFirestore = async () => {
    const usersDocRef = doc(db, "users", currentUser.email);

    try {
      let localRef = allPosts.find((post) => currentUser.email === post.email);
      let localRefSpread = [...localRef.posts];

      localRefSpread.push({
        text: wassupText,
        likes: 0,
        date: new Date(),
      });
      console.log("lala lala=>", localRefSpread);
      handleAllPostsUpdateDeleteOptimistically(
        localRefSpread,
        currentUser.email
      );
      await updateDoc(usersDocRef, {
        posts: arrayUnion({ text: wassupText, likes: 0, date: new Date() }),
      });
      setWassupText("");
      // handleReloadAfterWassupUpload();e

      toast.success("Posted successfully");
    } catch (e) {
      toast.warn("Couldn't post at the moment. Please retry after sometime!");
    }
  };
  return (
    <>
      <Box className={classes.mainOuterBox}>
        <Box className={classes.outerBox}>
          <Box>
            <Box className={classes.wassuptextbox}>
              <ThemeProvider theme={theme}>
                <input type="file" onChange={handleWassupImageChange} />
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

            <Box onClick={handlePostToFirestore} className={classes.postButton}>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="secondary">
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
