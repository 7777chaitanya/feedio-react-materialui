import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop : "0.5rem",
        "&:hover": {
          backgroundColor: "rgba(140,233,23,0.5)"
        }

      },
      notificationCard : {
        textDecoration : "none",
        color : "black"
      }
})

export default useStyles;