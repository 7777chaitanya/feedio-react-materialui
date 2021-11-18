import React, { useContext } from "react";
import { AllUserDetailsContext } from "../../../contexts/AllUserDetailsContext";
import useStyles from "./styles";
import EachUserDetail from "./EachUserDetail/EachUserDetail";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Box
} from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CurrentUserDetailsContext } from "../../../contexts/CurrentUserDetailsContext";

const UserSuggestion = () => {
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  const [currentUserDoc, setCurrentUserDoc] = useContext(CurrentUserDetailsContext);

  const classes = useStyles();

  const usersToShow = allUserDocs.filter(doc => doc.username !== currentUserDoc?.username);
console.log(usersToShow)
  console.log("user suggestion => ", currentUserDoc);
  return (
    <>
      <List className={classes.root}>
        <Typography variant="h5" className={classes.exploreFriends} align="center" color="primary">Explore Friends</Typography>
        {/* <Divider variant="inset" component="li" /> */}
        <Divider component="li" />


        <Box className={classes.usersList}>
        {usersToShow.map(eachDoc => <EachUserDetail 
        avatarUrl={eachDoc?.avatarUrl}
        bio={eachDoc?.bio}
        userName={eachDoc?.username}
        />)}

        </Box>
      </List>
    </>
  );
};

export default UserSuggestion;
