import {
  Box,
  Divider,
  Typography,
  TextField,
  InputBase,
  Button,
} from "@material-ui/core";
import React, {useState, useRef} from "react";
import useStyles from "./styles.js";
import feedionameCropped from "./feedionameCropped.png";
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import {auth} from "../../firebase";
import {useAuth} from "../../contexts/AuthContext";
import {useHistory, Link} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';



// import feedioname from "/src/public/feedioname.png";

const Login = () => {
  
  const classes = useStyles();
  const [error, setError] = useState("");
  const [signinSuccess, setSigninSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const history = useHistory();


 
  const theme = createTheme({
    palette: {
      secondary: {
        main: "rgb(140,233,23)",
        dark : "#1db954"

      },
    },
  });


    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("sign up method =>", auth);
  
      
      try {
        setError("");
        setLoading(true);
      //   setSigninSuccess("");
      if(emailRef.current.value==="" && passwordRef.current.value===""){
        setError("Email and Password field cannot be empty");
        return;
      }
      if(emailRef.current.value===""){
        setError("Email field cannot be empty");
        return;
      }
      if(passwordRef.current.value===""){
        setError("Password field cannot be empty");
        return;
      }
       
  
        const result = await login(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
        console.log("result =>", result);
        history.push('/');
      } catch (error) {
        setError("Failed to log in");
      }
      setLoading(false);
      window.location.reload(true)
    };
  

  return (
    <Box className={classes.mainBackground}>
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
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
      </Box>

      <form className={classes.root} noValidate autoComplete="off" action="Submit">
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
            <Typography component={Link} to="/forgot-password" variant="body2">Forgot your password?</Typography>
        </Box>
        <Box className={classes.box1}>
          <ThemeProvider theme={theme}><Button type="submit" variant="contained" color="secondary" disable={!loading} onClick={handleSubmit}>LOG IN</Button></ThemeProvider>
        </Box>
        

      </form>
      <Box className={classes.box1}>
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.box1}>
        <Typography variant="body1" className={classes.strong}>Don't have an account?</Typography>
      </Box>
      <Box className={classes.box1}>
          <ThemeProvider theme={theme}><Button variant="contained" color="secondary" component={Link} to="/signup">SIGN UP FOR FEEDIO</Button></ThemeProvider>
        </Box>
        <Box className={classes.box1}>
        <Divider className={classes.divider} />
      </Box>



    </Box>
  );
};

export default Login;
