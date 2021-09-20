import React,{useContext} from 'react';
import { AllUserDetailsContext } from '../../../contexts/AllUserDetailsContext';
import dateCustomizer from '../../../utils/dateCustomizer';
import {Card, CardHeader, Avatar } from '@material-ui/core/';
import {Link} from 'react-router-dom';
import useStyles from "./styles"
const NotificationCard = ({handleNotificationPopUp, notification}) => {
    const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
    const notificationOwner = allUserDocs.find(doc => doc.email ===notification.email);
    const classes = useStyles();

    return (
        <Card className={classes.root}>
      <CardHeader
        className={classes.notificationCard}
        component={Link}
        to={`/profile/${notification.username}`}
        onClick={handleNotificationPopUp}
        avatar={
          (notificationOwner?.avatarUrl!==null) &&
          (
          (notificationOwner?.avatarUrl)  ? (
            <Avatar
              alt={notificationOwner?.username}
              src={notificationOwner?.avatarUrl}
              className={classes.avatarSize}
            />
          ) : (
            <Avatar aria-label="recipe" className={classes.avatarSize} src={notificationOwner?.avatarUrl}
          >
            {notification.username[0].toUpperCase()}
          </Avatar>
          )
          )
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={`${notification.username} started following you`}
        subheader={dateCustomizer(notification.date)}
      />
    </Card>
    )
}

export default NotificationCard
