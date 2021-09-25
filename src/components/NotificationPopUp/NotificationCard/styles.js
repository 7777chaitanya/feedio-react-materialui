import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop : "0.5rem",
        "&:hover": {
          backgroundColor: "rgb(107,187,117)"
        }

      },
      notificationCard : {
        textDecoration : "none",
        color : "black"
      }
})

export default useStyles;