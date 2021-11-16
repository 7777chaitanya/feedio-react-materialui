import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme=>( {
    root : {
        position : "absolute",
        
        zIndex : 100,
        backgroundColor : "rgb(235,235,235)",
        left : "15vw",
        minWidth : "20vw",
        paddingLeft : "1vw",
        paddingRight : "1vw",
        paddingBottom : "1vw",
        [theme.breakpoints.down('sm')]: {
            minWidth : "60vw",          }
    }

}))

export default useStyles;