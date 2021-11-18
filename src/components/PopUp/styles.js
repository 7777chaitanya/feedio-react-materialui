import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "rgb(235,235,235)",
    left: "15vw",
    top: "12vh",
    minWidth: "20vw",
    paddingLeft: "1vw",
    paddingRight: "1vw",
    paddingBottom: "1vw",
    [theme.breakpoints.down("sm")]: {
      minWidth: "60vw",
    },
    maxHeight: "60vh",
    overflow: "auto",
    overflowX : "hidden"
  },
}));

export default useStyles;
