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
import feedioolive from "../../assets/feedioolive.png";
import WassupModal from "../WassupModal/WassupModal";

import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext.jsx";
import HouseIcon from "@material-ui/icons/House";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Avatar, Box, Popover, Tooltip } from "@material-ui/core";
import { useHistory, Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase.js";
import { useAuth } from "../../contexts/AuthContext";
import PopUp from "../PopUp/PopUp";
import NotificationPopUp from "../NotificationPopUp/NotificationPopUp";
import MessagesPopUp from "../MessagesPopUp/MessagesPopUp";
import NotificationsModal from "../NotificationsModal/NotificationsModal";
import MessagesModal from "../MessagesModal/MessagesModal.jsx";
import CloseIcon from "@material-ui/icons/Close";
import Post2 from "../Post2/Post2";
import { ClickContext } from "../../contexts/ClickContext.jsx";

export default function NavBar2() {
  const {
    displayPopUp,
    setDisplayPopUp,
    searchTerm,
    setSearchTerm,
    closeDisplayPopUp,
  } = useContext(ClickContext);
  // const [displayPopUp, setDisplayPopUp] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [displayNotificationPopUp, setDisplayNotificationPopUp] =
    useState(false);

  const [displayMessagesPopUp, setDisplayMessagesPopUp] = useState(false);

  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const classes = useStyles();
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [dummyState, setDummyState] = useState(false);

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

  const handleNotificationPopUp = () => {
    setDisplayNotificationPopUp((prevState) => !prevState);
    setDisplayMessagesPopUp(false);
    handleMenuClose();
  };

  const handleMessagesPopUp = () => {
    setDisplayMessagesPopUp((prevState) => !prevState);
    setDisplayNotificationPopUp(false);
    handleMenuClose();
  };

  const handleLogout = async () => {
    setError("");
    try {
      await logout(auth);
      history.push("/login");
    } catch (error) {
      setError("Log out Failed!");
    }
  };

  const handleDisplayPopUp = (e) => {
    setDisplayPopUp(true);
    setSearchTerm(e.target.value);
  };

  // const closeDisplayPopUp = (e) => {
  //   setDisplayPopUp(false);
  //   setSearchTerm("");
  // };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setDisplayPopUp(false);
      setSearchTerm("");
    }
  };

  const [wassupOpen, setWassupOpen] = React.useState(false);

  const handleWassupOpen = () => {
    setWassupOpen(true);
  };

  const handleWassupClose = () => {
    setWassupOpen(false);
  };

  const [openNotificationsModal, setOpenNotificationsModal] =
    React.useState(false);

  const handleNotificationsModalOpen = () => {
    setOpenNotificationsModal(true);
    closeDisplayPopUp();
  };

  const handleNotificationsModalClose = () => {
    setOpenNotificationsModal(false);
  };

  const [openMessagesModal, setOpenMessagesModal] = React.useState(false);

  const handleMessagesModalOpen = () => {
    setOpenMessagesModal(true);
    closeDisplayPopUp();
  };

  const handleMessagesModalClose = () => {
    setOpenMessagesModal(false);
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
      <MenuItem
        component={Link}
        to={`/profile/${currentUserDoc?.username}`}
        onClick={handleMenuClose}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} onClick={handleLogout}>
        Log out
      </MenuItem>
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
      <MenuItem component={Link} to="/" onClick={handleMobileMenuClose}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="secondary">
            <HouseIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleMessagesModalOpen}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleNotificationsModalOpen}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge
            badgeContent={currentUserDoc?.notifications?.length}
            color="secondary"
          >
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
          {currentUserDoc?.avatarUrl ? (
            <Avatar
              alt={currentUserDoc.username}
              src={currentUserDoc?.avatarUrl}
            />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Link to="/">
            <img className={classes.logo} src={feedioolive} alt="logo" />
          </Link>

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
            <IconButton
              onClick={closeDisplayPopUp}
              className={classes.cancelButton}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {location.pathname !== "/" && (
              <Tooltip title="Home">
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  component={Link}
                  to="/"
                >
                  <Badge
                    // badgeContent={4}
                    color="secondary"
                  >
                    <HouseIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
            {(location.pathname !== "/" && location.pathname === `/profile/${currentUserDoc.username}`)&& (
              <Tooltip title="Add post">
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleWassupOpen}
                >
                  <Badge color="secondary">
                    <AddCircleIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Messages">
              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleMessagesModalOpen}
              >
                <Badge badgeContent={0} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                // onClick={handleNotificationPopUp}
                onClick={handleNotificationsModalOpen}
              >
                <Badge
                  badgeContent={currentUserDoc?.notifications?.length}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Account">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {currentUserDoc?.avatarUrl ? (
                  <Avatar
                    alt={currentUserDoc.username}
                    src={currentUserDoc?.avatarUrl}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </Tooltip>
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
      {displayPopUp && (
        <PopUp searchTerm={searchTerm} closeDisplayPopUp={closeDisplayPopUp} />
      )}

      {displayNotificationPopUp && (
        <NotificationPopUp handleNotificationPopUp={handleNotificationPopUp} />
      )}

      {displayMessagesPopUp && (
        <MessagesPopUp handleMessagesPopUp={handleMessagesPopUp} />
      )}

      {wassupOpen && (
        <WassupModal
          wassupOpen={wassupOpen}
          handleWassupOpen={handleWassupOpen}
          handleWassupClose={handleWassupClose}
        />
      )}

      {openNotificationsModal && (
        <NotificationsModal
          openNotificationsModal={openNotificationsModal}
          handleNotificationsModalOpen={handleNotificationsModalOpen}
          handleNotificationsModalClose={handleNotificationsModalClose}
        />
      )}

      {openMessagesModal && (
        <MessagesModal
          openMessagesModal={openMessagesModal}
          handleMessagesModalOpen={handleMessagesModalOpen}
          handleMessagesModalClose={handleMessagesModalClose}
        />
      )}

      {/* <Box className={classes.hide}>
        <Post2 closeDisplayPopUp={closeDisplayPopUp} />
      </Box> */}
    </div>
  );
}
