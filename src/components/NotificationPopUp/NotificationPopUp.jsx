import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import useStyles from "./styles"
import { CurrentUserDetailsContext } from '../../contexts/CurrentUserDetailsContext';
import { AllUserDetailsContext } from '../../contexts/AllUserDetailsContext';
import NotificationCard from './NotificationCard/NotificationCard';
import { Typography } from '@material-ui/core';

const NotificationPopUp = ({handleNotificationPopUp}) => {
    const [currentUserDoc, setCurrentUserDoc] = useContext(
        CurrentUserDetailsContext
      );
    
      const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            {(currentUserDoc?.notifications?.length !== 0) ? 
            (currentUserDoc?.notifications?.map(notification => <NotificationCard notification={notification} handleNotificationPopUp={handleNotificationPopUp} />))
                    :
                    (<Typography variant="body1" align="center">You don't have any notifications</Typography>)
                }

        </Card>
    )
}

export default NotificationPopUp
