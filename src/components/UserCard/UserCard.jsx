import React from "react";
import { CardHeader } from '@material-ui/core/CardHeader';
import { Card } from '@material-ui/core/Card';
import useStyles from './styles.js'


const UserCard = () => {
    const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    </Card>
  );
};

export default UserCard;
