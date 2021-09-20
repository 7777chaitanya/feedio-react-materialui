import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  card: {
    position: "absolute",
    width: "40vw",
    height : "50vh",
    top : "30vh",
    left : "30vw",
    overflowY : "auto",
    display : "flex",
    flexDirection : "column",
    padding : "1rem", 
    justifyContent : "space-evenly"
  },
  input:{
      display : "none"
  }
}));

export default useStyles;
