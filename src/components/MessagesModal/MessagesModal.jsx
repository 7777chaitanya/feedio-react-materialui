import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import NotificationPopUp from '../NotificationPopUp/NotificationPopUp';
import MessagesPopUp from "../MessagesPopUp/MessagesPopUp"


function getModalStyle() {
  const top = 10 ;
  const left = 95 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
  
  },
}));

export default function SimpleModal({openMessagesModal, handleMessagesModalOpen, handleMessagesModalClose}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  

  const body = (
    <div style={modalStyle} className={classes.paper}>
     <MessagesPopUp handleMessagesModalClose={handleMessagesModalClose}/>
    </div>
  );

  return (
    <div>
    
      <Modal
        open={openMessagesModal}
        onClose={handleMessagesModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
