import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profileCover:{
    overflowX : "hidden"
  },
  veryOuterBox: {
    marginLeft: "10vw",
    marginRight: "10vw",
    paddingTop: "3vh",
    overflowX: "hidden"
  },
  bio :{
    paddingTop : "3vh"
  },
  profileHeaderContainer: {
    display: "flex",
  },
  avatar: {
    flex: 3,
    display: "flex",
    justifyContent: "center",
    paddingTop : "2vh"
    // alignItems: "center",
  },
  avatarSize: {
    height: "20vw",
    width: "20vw",
    // width : "full-width",
    // height : "full-height"
  },
  buttonGroup:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(3),
    },
  },
  eachButtonInButtonGroup:{
      fontWeight : 600
  },
  followerCountBox:{
      display :"flex",
      justifyContent:"space-between",
      margin : "2rem",
      [theme.breakpoints.down("sm")]: {
        display :"none"
      },

  },
  followerCountBoxNumbers:{
        fontWeight : 700
  },
  followerCountBoxForSmallDevices:{
      display :"flex",
      justifyContent:"space-evenly",
      [theme.breakpoints.up("sm")]: {
        display :"none"
      },
      marginTop: "2vh"

  },
  eachCountItem:{
      display: 'flex',
      flexDirection : "column",
      justifyContent:"center",
      alignItems : "center"
  },

  [theme.breakpoints.down("sm")]: {
    editProfileButton : {
        width : "13rem",
        
    },
    username:{
      
    }
  },
  [theme.breakpoints.up("sm")]: {
    username: {
      paddingRight: "10rem",
    },
    usernameAndEditProfileButtonContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    profileDetails: {
      flex: 7,
      paddingTop: "3vh",
    },
    editProfileButton : {
        width : "15rem",
        marginTop : "1vh"
        // paddingTop :0,
        // paddingBottom : 0
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    
  },
}));

export default useStyles;
