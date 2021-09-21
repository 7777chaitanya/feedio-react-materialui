import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    root : {
        minWidth : 275,
        position : "absolute",
        right : "5vw",
        backgroundColor : "darkgray",
        zIndex:100,
    },
    closeIcon:{
        display : "flex",
        justifyContent : "flex-end",
        alignItems : "center"
        
    }
    
})

export default useStyles;