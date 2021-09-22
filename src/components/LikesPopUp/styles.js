import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme =>({
    root : {
        position : "fixed",
        paddingBottom : "0.5rem",
        top : "10vh",
        left : "30vw",
        zIndex : 100,
        maxHeight : "40vh",
        overflowY : "auto",
        
        display : 'flex',
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "column",

        [theme.breakpoints.down('sm')]: {
width : "80vw",
left : "9vw",

          },
          [theme.breakpoints.up('md')]: {
            width : "35vw",
        },

    },
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      typography:{
          fontWeight : 600
      },
      border:{
        marginTop : "2rem",

        //   border : "1rem solid lawngreen"
      },
      cancelIcon:{
          display : "flex",
          marginTop : "1rem",
          alignItems : "center"
      },
      icon:{
          position: "absolute",
          right : "2rem",
        //   paddingTop : 0
      }

}))

export default useStyles;