import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import NotificationPopUp from '../NotificationPopUp/NotificationPopUp';


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

export default function SimpleModal({openNotificationsModal, handleNotificationsModalOpen, handleNotificationsModalClose}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  

  const body = (
    <div style={modalStyle} className={classes.paper}>
     <NotificationPopUp handleNotificationsModalClose={handleNotificationsModalClose}/>
    </div>
  );

  return (
    <div>
    
      <Modal
        open={openNotificationsModal}
        onClose={handleNotificationsModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
