import useStyles from "./styles";
import { Card } from "@material-ui/core";
import LikeUserCard from "./LikeUserCard/LikeUserCard";
import {Typography} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import {Box} from "@material-ui/core";
import {IconButton} from "@material-ui/core";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

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


export default function LikesPopUp({ handleCloseLikesPopUp, likedBy, openLikesPopUp }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  

  const body = (
    <div className={classes.border}>
        <Card className={classes.root}>
          {/* <button color="primary" onClick={handleCloseLikesPopUp}>
            close
          </button> */}
          <Box className={classes.cancelIcon}>
          <Typography align="center" variant="h5" className={classes.typography} display="inline">Likes</Typography>
          <Box className={classes.icon}>
              <IconButton onClick={handleCloseLikesPopUp}>
          <CancelIcon/>
          </IconButton>
          </Box>
          </Box>
          {likedBy.map((user) => (
            <LikeUserCard user={user} handleLikesPopUp={handleCloseLikesPopUp} />
          ))}
        </Card>
    </div>
  );

  return (
    <div>
      
      <Modal
        open={openLikesPopUp}
        onClose={handleCloseLikesPopUp}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
