import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainBackground: {
    // backgroundColor : "rgba(0,0,0,0.8)",
    backgroundColor: "white",
    height: "100vh",
    width: "99vw",
  },
  typography: {
    color: "black",
    fontWeight: "700",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
  logo: {
    height: "10vh",
    width: "auto",
    margin: "0.5rem 0",
  },
  divider: {
    height: "0.1rem",
    width: "90vw",
  },
  textField: {
    border: "1px solid lawngreen",
    borderRadius: theme.shape.broderRadius,
    minWidth: "30px",
  },
  input: {
    border: "0.1rem solid lawngreen",
    borderRadius: 5,
    padding: "0.2rem 0.5rem",
    display: "none",
  },
  box1: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    marginTop: "1.5rem",
  },
  button: {
    background: "lawngreen",
    color: "white",
    border: "none",
    padding: "0 10vw",
  },
  strong: {
    fontWeight: "700",
  },
  termsBox: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
  termsText: {
    fontSize: "0.7rem",
    marginTop: "0.5rem",
  },
  termsTextLink: {
    fontSize: "0.7rem",
    color: "lawngreen",
  },
  dummyBox: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    width: "70vw",
  },
  outerBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop : "1rem",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70vw",
    },
  },
  avatarBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  },
  wassuptextbox: {
    flex: 0.8,
    
    marginLeft : "auto",
    marginRight : "auto"
   
  },
  mainOuterBox: {
    border: "0.2 rem solid lightgray",
    marginBottom : "2rem"
  },
  // input: {
  //   display: "none",
  // },
//   uploadImageButton : {
//       display : "none"
//   }
postButton:{
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    marginTop : "1rem"
},
imageBox:{
  display: "none"
},
progressBar:{
  width : "60vw",
  marginTop : "2rem",
marginLeft : "auto",
marginRight : 'auto', 
marginBottom : "4rem"
},
emojiPicker:{
  marginLeft : "10rem",
  marginTop : "1rem"
}
}));

export default useStyles;
