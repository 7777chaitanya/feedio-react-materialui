import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import useStyles from "./styles";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import NotificationCard from "./NotificationCard/NotificationCard";
import { Typography, IconButton, Box } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const NotificationPopUp = ({ handleNotificationPopUp, handleNotificationsModalClose }) => {
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );

  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <Box className={classes.closeIcon}>
      {/* <IconButton size="small" onClick={handleNotificationPopUp} >
        <HighlightOffIcon />
      </IconButton> */}
      </Box>
      {currentUserDoc?.notifications?.length !== 0 ? (
        currentUserDoc?.notifications?.map((notification) => (
          <NotificationCard
            notification={notification}
            handleNotificationsModalClose={handleNotificationsModalClose}
          />
        ))
      ) : (
        <Typography variant="body1" align="center">
          You don't have any notifications
        </Typography>
      )}
    </Card>
  );
};

export default NotificationPopUp;
