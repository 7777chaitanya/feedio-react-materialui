import React from 'react';
import useStyles from "./styles";
import {Card, Typography} from "@material-ui/core";

const NoPostsCard = ({text}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Typography variant="h5" color="primary" className={classes.typo} align="center">
                    {text}
            </Typography>
        </Card>
    )
}

export default NoPostsCard
