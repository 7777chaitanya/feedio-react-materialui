import React, {  useState, useContext } from "react";
import { AppBar, Box, Button, createTheme, IconButton, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from "./styles.js";
import feediowhitebackground from "../../assets/feediowhitebackground.png";
import { useHistory, Link } from 'react-router-dom';
import { auth } from "../../firebase.js";
import { useAuth } from "../../contexts/AuthContext";
import { CurrentUserDetailsContext } from '../../contexts/CurrentUserDetailsContext';


const NavBar = ({currentUsername, handleAllPostsUpdateDeleteOptimistically}) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const history = useHistory();
  const {logout } = useAuth();
  const [currentUserDoc, setCurrentUserDoc] = useContext(CurrentUserDetailsContext);

  console.log("Navbar =>",currentUserDoc)



  const themeGreen = createTheme({
    palette: {
      primary: {
        main: "rgb(140,233,23)",
        dark: "#1db954",
      },
    },
  });


  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(255,255,255)",
        dark: "rgb(140,233,23)",
      },
    },
  });

 

  const handleLogout = async () => {
      setError("");
      try {
          await logout(auth);
          history.push('/login');
        }
      catch(error){
          setError("Log out Failed!");
      }
  };


  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Box className={classes.logoBox}>
            <img className={classes.logo} src={feediowhitebackground} alt="logo" />
        </Box>
        {/* <Typography variant="h6" className={classes.title}>
          Hi, {currentUserDoc.username}
        </Typography> */}
        
        {/* <ThemeProvider theme={themeGreen}> */}

        <Box className={classes.dummyBox}></Box>
        <Button color="inherit" component={Link} to="/my-posts" handleAllPostsUpdateDeleteOptimistically={handleAllPostsUpdateDeleteOptimistically}>My posts</Button>

        <Button color="inherit" component={Link} to="/all-posts" handleAllPostsUpdateDeleteOptimistically={handleAllPostsUpdateDeleteOptimistically}>All Posts</Button>
        <Button color="inherit" onClick={handleLogout}>Log out</Button>
        {/* </ThemeProvider> */}
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
