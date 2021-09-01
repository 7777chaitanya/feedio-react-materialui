import {
  Box,
  Divider,
  Typography,
  TextField,
  InputBase,
  Button,
  CssBaseline,
} from "@material-ui/core";
import React, { useState, useRef } from "react";
import useStyles from "./styles.js";
import feedionameCropped from "./feedionameCropped.png";
import { createTheme, ThemeProvider, useTheme } from "@material-ui/core/styles";
import { auth } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import {db } from "../../firebase" 


const Signup = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [signinSuccess, setSigninSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();
  const history = useHistory();

  const theme = createTheme({
    palette: {
      secondary: {
        main: "rgb(140,233,23)",
        dark: "#1db954",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sign up method =>", auth);
    if(usernameRef.current.value===""){
      return setError("Please enter an Username")
    }
    if(emailRef.current.value === ""){
      return setError("Email is mandatory");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }
    try {
      setError("");
      setLoading(true);
      setSigninSuccess("");

      const result = await signup(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
  try{
        // const docRef = await setDoc(collection(db, "users", emailRef.current.value), {
        //   username: usernameRef.current.value,
        //   email: emailRef.current.value,
        //   password: passwordRef.current.value,
        //   posts : [],
        //   verified : false
        // });
        const docRef = await setDoc(doc(db, "users", emailRef.current.value), {
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          posts : [],
          verified : false
        });
        
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        
        console.log("Error adding document: ", e);
        return setError("Signup failed. Please retry!")
      }
      
      history.push("/");
      console.log("result =>", result);
    } catch (error) {
      setError(error.code);
    }
    // setError
    setLoading(false);
  };

  return (
    <Box className={classes.mainBackground}>
      <CssBaseline />
      <Box className={classes.box}>
        <img
          className={classes.logo}
          src={feedionameCropped}
          alt="feedio logo"
        />
      </Box>

      <Box className={classes.box}>
        <Divider className={classes.divider} />
      </Box>

      <Box className={classes.box1}>
        <Typography className={classes.typography} variant="h5">
          Sign up for free to start posting
        </Typography>
      </Box>

      <Box className={classes.box1}>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
      </Box>

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        action="Submit"
      >
        <Box className={classes.box1}>
          <ThemeProvider theme={theme}>
            <TextField
              id="outlined-secondary"
              label="User name"
              variant="outlined"
              color="secondary"
              inputRef={usernameRef}
            />
          </ThemeProvider>
        </Box>
        <Box className={classes.box1}>
          <ThemeProvider theme={theme}>
            <TextField
              id="outlined-secondary"
              label="Email address"
              variant="outlined"
              color="secondary"
              inputRef={emailRef}
            />
          </ThemeProvider>
        </Box>
        <Box className={classes.box1}>
          <ThemeProvider theme={theme}>
            <TextField
              id="outlined-secondary"
              label="Password"
              variant="outlined"
              color="secondary"
              inputRef={passwordRef}
              type="password"
            />
          </ThemeProvider>
        </Box>
        <Box className={classes.box1}>
          <ThemeProvider theme={theme}>
            <TextField
              id="outlined-secondary"
              label="Confirm Password"
              variant="outlined"
              color="secondary"
              inputRef={passwordConfirmRef}
              type="password"
            />
          </ThemeProvider>
        </Box>
        <Box className={classes.box1}>
          <Typography component={Link} to="/login" variant="body2">
            Already have an account?
          </Typography>
        </Box>

        <Box className={classes.termsBox}>
          <Box className={classes.dummyBox}>
            <Typography className={classes.termsText} display="inline">
              By clicking on sign-up, you agree to Feedio's{" "}
              <Typography
                display="inline"
                className={classes.termsTextLink}
                component={Link}
                to="/signup"
              >
                Terms and Conditions of Use.
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box className={classes.termsBox}>
          <Box className={classes.dummyBox}>
            <Typography display="inline" className={classes.termsText}>
              To learn more about how Feedio collects, uses, shares and protects
              your personal data, please see{" "}
              <Typography
                display="inline"
                className={classes.termsTextLink}
                component={Link}
                to="/signup"
              >
                Feedio's Privacy Policy.
              </Typography>
            </Typography>
          </Box>
        </Box>

        <Box className={classes.box1}>
          <ThemeProvider theme={theme}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disable={!loading}
              onClick={handleSubmit}
            >
              SIGN UP
            </Button>
          </ThemeProvider>
        </Box>

        {/* <Box className={classes.box1}>
              <Typography component={Link} to="/login" variant="body2">Already have an account?</Typography>
          </Box> */}
      </form>
      <Box className={classes.box1}>
        <Divider className={classes.divider} />
      </Box>
      {/* <Box className={classes.box1}>
          <Typography variant="body1" className={classes.strong}>Don't have an account?</Typography>
        </Box>
        <Box className={classes.box1}>
            <ThemeProvider theme={theme}><Button variant="contained" color="secondary" disable={!loading} onClick={handleSubmit}>SIGN UP FOR FEEDISH</Button></ThemeProvider>
          </Box> */}
    </Box>
  );
};

export default Signup;
