import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  CurrentUserDetailsContext,
  CurrentUserDetailsProvider,
} from "../../../contexts/CurrentUserDetailsContext";
import { AllUserDetailsContext } from "../../../contexts/AllUserDetailsContext";
import ListItemGroup from "./UsersListToDisplay/ListItemGroup/ListItemGroup";

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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ShowFollowersListModal({
  open,
  handleOpen,
  handleClose,
  whoToShow,
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
      if (currentUserDoc?.followers?.includes(user.email)) {
        usersToShow.push(user);
      }
    });
  } else {
    allUserDocs.forEach((user) => {
      if (currentUserDoc?.following?.includes(user.email)) {
        usersToShow.push(user);
      }
    });
  }

  console.log("usersToShow => ", usersToShow);

  const body = () => {
    return (
      <div style={modalStyle} className={classes.paper}>
        <h2>{whoToShow}</h2>

        <ListItemGroup usersToShow={usersToShow} />
      </div>
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
