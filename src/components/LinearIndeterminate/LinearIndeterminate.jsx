import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop : "1rem", 
    // marignBottom : "2rem",
    '& > * + *': {
      marginTop: theme.spacing(4),
   
    },
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <LinearProgress /> */}
      <LinearProgress color="secondary" />
    </div>
  );
}
