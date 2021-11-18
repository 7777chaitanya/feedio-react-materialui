import React from "react";
import { Avatar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import useStyles from "./styles";
import {useHistory} from "react-router-dom";

const EachUserDetail = ({avatarUrl, bio, userName}) => {
  const classes = useStyles();
  const history = useHistory()

  const handleEnterUserProfile = () => {
    history.push(`/profile/${userName}`);
  }

  return (
    <>
      <ListItem alignItems="flex-start" button={true} onClick={handleEnterUserProfile}>
        <ListItemAvatar>
        {(avatarUrl)  ? (
            <Avatar
              alt={userName}
              src={avatarUrl}
              // className={classes.avatarSize}
            />
          ) : (
            <Avatar aria-label="recipe" 
            // className={classes.avatarSize} 
            src={avatarUrl}
          >
            {userName[0].toUpperCase()}
          </Avatar>)}
        </ListItemAvatar>

        {/* <ListItemText
        primary={userName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {bio}
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        /> */}

        <ListItemText className={classes.userSuggestionUserName}>
          <Typography variant="body1">{userName}</Typography>
          </ListItemText>
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default EachUserDetail;
