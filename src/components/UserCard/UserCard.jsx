import React from "react";
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import { Card } from '@material-ui/core';
import useStyles from './styles.js';
import {Link} from "react-router-dom";
import { Typography } from '@material-ui/core';


const UserCard = ({item, searchTerm, closeDisplayPopUp}) => {
    const classes = useStyles();
    
  return (
    (item.username === "No results found!" || item.username ==="Enter a word to Search!") 
    
    ?

    (<Card className={classes.typographyRoot}>

    <Typography className={classes.typography} variant="body1">{item.username}</Typography>
</Card>)
:
    (<Card className={classes.root}>
      
      <CardHeader
        className={classes.usercard}
        component={Link}
        to={`/profile/${item.username}`}
        onClick={closeDisplayPopUp}
        avatar={
          (item?.avatarUrl!==null) &&
          (
          (item?.avatarUrl)  ? (
            <Avatar
              alt={item?.username}
              src={item?.avatarUrl}
              className={classes.avatarSize}
            />
          ) : (
            <Avatar aria-label="recipe" className={classes.avatarSize} src={item?.avatarUrl}
          >
            {item.username[0].toUpperCase()}
          </Avatar>
          )
          )
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={item.username}
        // subheader="September 14, 2016"
      />
    </Card>)
      
)
    }

export default UserCard;
