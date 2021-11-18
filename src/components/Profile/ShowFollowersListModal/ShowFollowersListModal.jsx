import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  CurrentUserDetailsContext,
} from "../../../contexts/CurrentUserDetailsContext";
import { AllUserDetailsContext } from "../../../contexts/AllUserDetailsContext";
import ListItemGroup from "./UsersListToDisplay/ListItemGroup/ListItemGroup";
import { Typography, Button, IconButton, Box, Paper, Divider } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "25vw",
    [theme.breakpoints.down('sm')]: {
        width : "40vw"
      },
      [theme.breakpoints.down('xs')]: {
        width : "80vw"
      },
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  headingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelIcon: {
    color: "darkGray",
    "&:hover": {
      color: "red",
    },
    position: "relative",
    right: "0rem",
  },
  iconButtonBox:{
      flex : "1"
  },
  headingTypography:{
      flex : '9',
      marginLeft : "15%",
     
  }
}));

export default function ShowFollowersListModal({
  open,
  handleOpen,
  handleClose,
  whoToShow,
  handleFollow,
  handleUnfollow,
  profileBelongsTo
}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);

  let usersToShow = [];

  if (whoToShow === "followers") {
    allUserDocs.forEach((user) => {
      if (  profileBelongsTo
        ?.followers?.includes(user.email)) {
        usersToShow.push(user);
      }
    });
  } else {
    allUserDocs.forEach((user) => {
      if (  profileBelongsTo
        ?.following?.includes(user.email)) {
        usersToShow.push(user);
      }
    });
  }


  const body = () => {
    return (
      <Paper style={modalStyle} className={classes.paper} elevation={4}>
        <Box className={classes.headingBox}>
          <Typography variant="h3" color="primary" display="inline" className={classes.headingTypography}>
            {`${whoToShow[0]?.toUpperCase()}${whoToShow?.slice(1)}`}
          </Typography>
          <Box className={classes.iconButtonBox}>
            <IconButton className={classes.cancelIcon} onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider/>

        <ListItemGroup 
        usersToShow={usersToShow}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
        handleClose={handleClose}
        />
      </Paper>
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body()}
      </Modal>
    </div>
  );
}
