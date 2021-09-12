import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    veryOuterBox:{
        marginLeft : "10vw",
        marginRight : "10vw",
        paddingTop : "5vh"
    },
    profileHeaderContainer:{
        display: "flex",
        alignItems: "center"
    },
    avatar:{
        flex : "40%",
        display : "flex",
        justifyContent: "center",
        alignItems : "center"
    },
    avatarSize:{
        height : "20vw",
        width : "20vw"
    },
    profileDetails:{
        flex : "60%"
    }
});

export default useStyles;