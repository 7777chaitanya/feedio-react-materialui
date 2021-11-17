import React from "react";
import { Avatar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import useStyles from "./styles";

const EachUserDetail = ({avatarUrl, bio, userName}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={avatarUrl}
          />
        </ListItemAvatar>
        <ListItemText
          primary={userName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {/* {bio} */}
              </Typography>
              {/* {" — I'll be in your neighborhood doing errands this…"} */}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default EachUserDetail;
