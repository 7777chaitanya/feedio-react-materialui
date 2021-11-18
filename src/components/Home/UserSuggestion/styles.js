import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
      exploreFriends:{
         marginBottom : "1rem",
         
      },
      usersList:{
        maxHeight : "60vh",
        overflow : "auto",
        overflowX : "hidden"
      }
}))

export default useStyles;