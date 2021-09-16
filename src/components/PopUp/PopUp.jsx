import React from 'react';
import useStyles from "./styles";
import UserCard from "../UserCard/UserCard";
import { Card } from '@material-ui/core';

const searchKeywords = [
    "Brustro",
    "Bianyo",
    "Camel",
    "DOMS",
    "Faber Castell",
    "Colours",
    "Drawing Boards",
    "Drawing Pencils",
    "Eraser",
    "Portfolio Storage",
    "Painting Brush",
    "Painting Knives"
  ];

const PopUp = ({searchTerm}) => {
    const classes = useStyles();
    console.log("search term PopuP =>",searchTerm);
    const filteredArray = searchKeywords.filter(item => item.toLowerCase().indexOf(searchTerm.toLowerCase().trim()) !== -1);
    console.log("filtered Array =>", filteredArray)

    return (
        <Card className={classes.root}>
            {filteredArray.map(item => <UserCard item={item}></UserCard>)}
        </Card>
    )
}

export default PopUp
