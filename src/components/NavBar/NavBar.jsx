import React, {  useState } from "react";
import { AppBar, Box, Button, createTheme, IconButton, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from "./styles.js";
import feedionameCropped from "./feedionameCropped.png";
import { useHistory, Link } from 'react-router-dom';
import { auth } from "../../firebase.js";
import { useAuth } from "../../contexts/AuthContext";


const NavBar = ({currentUsername}) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const history = useHistory();
  const {logout } = useAuth();


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
        <Typography variant="h6" className={classes.title}>
          Hi, {currentUsername}
        </Typography>
        {/* <Box className={classes.logoBox}>
            <img className={classes.logo} src={feedionameCropped} alt="logo" />
        </Box> */}
        {/* <ThemeProvider theme={themeGreen}> */}
        <Button color="inherit" component={Link} to="/my-posts">My posts</Button>

        <Button color="inherit" component={Link} to="/all-posts">All Posts</Button>
        <Button color="inherit" onClick={handleLogout}>Log out</Button>
        {/* </ThemeProvider> */}
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
