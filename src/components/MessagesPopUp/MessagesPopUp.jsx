import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import useStyles from "./styles";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import { Typography, IconButton, Box } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const NotificationPopUp = ({ handleMessagesPopUp }) => {
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );

  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        {/* <Box className={classes.closeIcon}>
      <IconButton size="small" onClick={handleMessagesPopUp} >
        <HighlightOffIcon />
      </IconButton>
      </Box> */}
     
        <Typography variant="body1" align="center">
          You don't have any messages
        </Typography>
      
    </Card>
  );
};

export default NotificationPopUp;
