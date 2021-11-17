import { makeStyles } from "@material-ui/core";

const  useStyles = makeStyles({
    goToTopButtonBox:{
        position : "fixed",
        zIndex : "100",
        bottom : "2rem",
        right : "2rem",
        border : "1px solid gray",
        borderRadius : "50px",
        backgroundColor : "rgb(107,187,117)"
    }
})

export default useStyles;