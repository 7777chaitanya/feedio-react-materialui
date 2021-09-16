import React from "react";
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import { Card } from '@material-ui/core';
import useStyles from './styles.js'


const UserCard = ({item}) => {
    const classes = useStyles();
    
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={item}
        // subheader="September 14, 2016"
      />
    </Card>
  );
};

export default UserCard;
