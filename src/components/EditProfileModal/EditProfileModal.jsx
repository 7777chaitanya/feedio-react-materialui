import React, {useContext, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import useStyles from './styles'
import { Card, Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { CurrentUserDetailsContext } from '../../contexts/CurrentUserDetailsContext';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



export default function EditProfileModal({open, handleOpen, handleClose}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const [modalUsername, setModalUsername] = useState(currentUserDoc?.username);
  const usernameRef = useRef();
  const bioRef = useRef();

  const editProfileDisabled = () =>{
      return false;
  }

  const handleProfileChangesSave = () => {
      console.log("handleProfileChangesSave");
      console.log(usernameRef.current.value);
      console.log(bioRef.current.value);
      handleClose();
  }


const body = (
    <Card className={classes.card}>
        <TextField
          id="outlined-helperText"
          label="username"
          defaultValue={currentUserDoc?.username}
          helperText="Some important text"
          variant="outlined"
          inputRef = {usernameRef}
        />
    
    <TextField
          id="outlined-multiline-flexible"
          label="Bio"
          defaultValue={currentUserDoc.bio}
          multiline
          maxRows={4}
        //   value={value}
        //   onChange={handleChange}
          variant="outlined"
          inputRef = {bioRef}
        />
        <Button  variant="contained" color="primary" size="small" disabled={editProfileDisabled()}
        onClick={handleProfileChangesSave}
        >Save And Close</Button>
        

    </Card>
)

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
