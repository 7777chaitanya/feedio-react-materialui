import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
      exploreFriends:{
         marginBottom : "1rem"
      }
}))

export default useStyles;