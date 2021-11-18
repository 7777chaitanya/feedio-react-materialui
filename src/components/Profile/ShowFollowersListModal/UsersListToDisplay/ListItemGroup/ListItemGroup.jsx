import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import { CurrentUserDetailsContext } from "../../../../../contexts/CurrentUserDetailsContext";
import { AllUserDetailsContext } from "../../../../../contexts/AllUserDetailsContext";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  followButton: {
    backgroundColor: "lightGray",
    "&:hover": {
      backgroundColor: "darkGray",
    },
  },
  unfollowButton: {
    backgroundColor: "lightGray",
    "&:hover": {
      backgroundColor: "darkGray",
    },
  },
}));

export default function ListItemGroup({
  usersToShow,
  handleFollow,
  handleUnfollow,
  handleClose
}) {
  const classes = useStyles();
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  const history = useHistory();

  const buttonToShow = (value) => {
    return currentUserDoc.following.includes(value?.email) ? (
      <Button
        className={classes.unfollowButton}
        onClick={() => {
          console.log(value?.email);
          handleUnfollow(value?.email);
        }}
      >
        Unfollow
      </Button>
    ) : (
      <Button
        className={classes.followButton}
        onClick={() => {
          handleFollow(value?.email);
        }}
      >
        Follow
      </Button>
    );
  };

  const handleProfileUrlChange = (username) => {
    history.push(`/profile/${username}`);
    handleClose();
  };

  return (
    <List className={classes.root}>
      {usersToShow.map((value) => {
        return (
          <ListItem
            key={value?.email}
            role={undefined}
            dense
            button
            onClick={() => handleProfileUrlChange(value?.username)}
            // component={Link}
            // to={`/profile/${value?.username}`}
          >
            <ListItemAvatar>
              <Avatar alt={value?.email} src={value?.avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={value?.username} />
            {/* <ListItemSecondaryAction>
              {buttonToShow(value)}
            </ListItemSecondaryAction> */}
          </ListItem>
        );
      })}
    </List>
  );
}
