import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import { CurrentUserDetailsContext } from '../../../../../contexts/CurrentUserDetailsContext';
import { AllUserDetailsContext } from '../../../../../contexts/AllUserDetailsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListItemGroup({usersToShow}) {
  const classes = useStyles();
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
 
  const buttonToShow = (value) => {
      return (currentUserDoc.following.includes(value?.email)) ?
          
              <Button>Unfollow</Button>
          
      
      :
          <Button>Follow</Button>
      
  }

  return (
    <List className={classes.root}>
      {usersToShow.map((value) => {

        return (
          <ListItem key={value?.email} role={undefined} dense button
        //    onClick={}
           >
            <ListItemAvatar>
              <Avatar
                alt={value?.email}
                src={value?.avatarUrl}
              />
            </ListItemAvatar>
            <ListItemText  primary={value?.username} />
            <ListItemSecondaryAction>
             
              {buttonToShow(value)}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
