import React, { useContext } from "react";
import { AllUserDetailsContext } from "../../../contexts/AllUserDetailsContext";
import useStyles from "./styles";
import EachUserDetail from "./EachUserDetail/EachUserDetail";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
} from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const UserSuggestion = () => {
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  const classes = useStyles();

  console.log("user suggestion => ", allUserDocs);
  return (
    <>
      <List className={classes.root}>
        <Typography variant="h6" className={classes.exploreFriends} align="center">Explore Friends</Typography>
        <Divider variant="inset" component="li" />

        
        {allUserDocs.map(eachDoc => <EachUserDetail 
        avatarUrl={eachDoc?.avatarUrl}
        bio={eachDoc?.bio}
        userName={eachDoc?.username}
        />)}
      </List>
    </>
  );
};

export default UserSuggestion;
