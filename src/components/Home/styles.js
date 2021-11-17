import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  goToTopButtonBox: {
    position: "fixed",
    zIndex: "100",
    bottom: "2rem",
    right: "2rem",
    border: "1px solid gray",
    borderRadius: "50px",
    backgroundColor: "rgb(107,187,117)",
  },
  outerBox: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    marginTop : "5.5rem",
    maxHeight : "90vh"
    
  },
  innerBoxLeft: {
    flex: 7,
    overflowY : "scroll"
  },
  innerBoxRight: {
    flex : 3,
    overflowY: "hidden",
    overlfowX : "hidden"
   
  },
  homePage : {
      overflow : "hidden"
  }

});

export default useStyles;
