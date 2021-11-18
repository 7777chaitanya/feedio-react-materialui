import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    root : {
        minWidth : 275,
        position : "absolute",
        right : "5vw",
        backgroundColor : "rgb(235,235,235)",
        zIndex:100,
        maxHeight : "60vh",
        overflow : "auto",
        overflowX : "hidden"
    },
    closeIcon:{
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "center"
        
    }
    
})

export default useStyles;