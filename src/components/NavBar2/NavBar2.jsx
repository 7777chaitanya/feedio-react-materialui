import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles.js";
import feediowhitebackground from "../../assets/feediowhitebackground.png";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext.jsx";
import HouseIcon from "@material-ui/icons/House";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Avatar, Popover } from "@material-ui/core";
import { useHistory, Link } from 'react-router-dom';
import { auth } from "../../firebase.js";
import { useAuth } from "../../contexts/AuthContext";
import PopUp from '../PopUp/PopUp';
import NotificationPopUp from "../NotificationPopUp/NotificationPopUp"

export default function NavBar2() {
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayNotificationPopUp, setDisplayNotificationPopUp] = useState(false)


  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const classes = useStyles();
  const [error, setError] = useState("");
  const history = useHistory();
  const {logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to={`/profile/${currentUserDoc?.username}`}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose} onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {currentUserDoc?.avatarUrl ?
                <Avatar alt={currentUserDoc.username} src={currentUserDoc?.avatarUrl} /> :
              <AccountCircle />}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleDisplayPopUp = (e) =>{
    setDisplayPopUp(true);
    setSearchTerm(e.target.value)
  }

  const closeDisplayPopUp = (e) =>{
    setDisplayPopUp(false);
    setSearchTerm("");
  }

  const handleKeyPress = (e) => {
    if(e.key === "Escape") {
      setDisplayPopUp(false);
      setSearchTerm("");
  }
  }

  const handleNotificationPopUp = () => {
    setDisplayNotificationPopUp(prevState => !prevState);
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <img
            className={classes.logo}
            src={feediowhitebackground}
            alt="logo"
          />

          <Typography className={classes.title} variant="h6" noWrap>
            FEEDIO
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={handleDisplayPopUp}
              onKeyDown={handleKeyPress}
              value={searchTerm}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge
                badgeContent={4}
                color="secondary"
                
              >
                <HouseIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge color="secondary">
                <AddCircleIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleNotificationPopUp}>
              <Badge badgeContent={currentUserDoc?.notifications?.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
                {currentUserDoc?.avatarUrl ?
                <Avatar alt={currentUserDoc.username} src={currentUserDoc?.avatarUrl} /> :
              <AccountCircle />}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {displayPopUp && 
      <PopUp searchTerm={searchTerm} closeDisplayPopUp={closeDisplayPopUp} />}
      
      {displayNotificationPopUp && <NotificationPopUp handleNotificationPopUp={handleNotificationPopUp} />}
    </div>
  );
}
