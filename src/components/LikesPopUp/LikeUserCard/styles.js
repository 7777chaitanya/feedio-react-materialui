import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: "0.5rem",
    "&:hover": {
      backgroundColor: "rgba(140,233,23,0.5)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "60vw",
     
    },
    [theme.breakpoints.up("md")]: {
      width: "20vw",
    },
  },
  usercard: {
    textDecoration: "none",
    color: "black",
  },
  typographyRoot: {
    maxWidth: 345,
    marginTop: "0.5rem",
  },
  typography: {
    margin: "1rem 2rem",
  },
}));

export default useStyles;
