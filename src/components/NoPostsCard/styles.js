import { makeStyles } from "@material-ui/core";
import { Typography } from '@material-ui/core/Typography';

const useStyles = makeStyles(theme =>({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "60vw",
    },
    marginLeft: "auto",
    marginRight: "auto",
  },
  typo : {
      marginLeft : "auto",
      marginRight : "auto",
      marginTop : "2rem",
      marginBottom : "2rem"
  }
}));

export default useStyles;
