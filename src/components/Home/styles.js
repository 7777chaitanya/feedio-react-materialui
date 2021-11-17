import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
  goToTopButtonBox: {
    position: "fixed",
    zIndex: "100",
    bottom: "2rem",
    [theme.breakpoints.down('sm')]: {
      right: "2rem",
    },
    [theme.breakpoints.up('sm')]: {
      left: "63vw",
    },
    border: "1px solid gray",
    borderRadius: "50px",
    backgroundColor: "rgb(107,187,117)",
  },
  outerBox: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    marginTop : "5.5rem",

   
    [theme.breakpoints.up('sm')]: {
      maxHeight : "90vh"
    },
    
  },
  innerBoxLeft: {
    flex: 7,
    [theme.breakpoints.up('sm')]: {
      overflowY : "scroll"
    },
  },
  innerBoxRight: {
    flex : 3,
    overflowY: "hidden",
    overlfowX : "hidden",
    [theme.breakpoints.down('sm')]: {
      display : "none"
    },

   
  },
  homePage : {
      overflow : "hidden"
  }

}));

export default useStyles;
