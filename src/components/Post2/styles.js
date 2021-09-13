import { makeStyles } from "@material-ui/core";
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
      // maxWidth: 345,
      [theme.breakpoints.down('sm')]: {
        
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth : "50vw",
        marginLeft :"auto",
        marginRight : "auto",
      },
     
      marginBottom : "2rem"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      
      
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      // backgroundColor: red[500],
      backgroundColor : "#8ce917"
    },
  }));

export default useStyles;