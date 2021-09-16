import React, { useContext } from "react";
import useStyles from "./styles";
import UserCard from "../UserCard/UserCard";
import { Card } from "@material-ui/core";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";

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
  "Painting Knives",
];

const PopUp = ({ searchTerm }) => {
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);

  const classes = useStyles();
//   let filteredUserDocs = allUserDocs.filter(
//     (doc) =>
//       doc.username.toLowerCase().indexOf(searchTerm.toLowerCase().trim()) !== -1
//   );
//   console.log("search term PopuP =>", filteredUserDocs);

  let filteredArray = [];

  if(searchTerm!==""){
      filteredArray = allUserDocs.filter(doc => doc.username.toLowerCase().indexOf(searchTerm.toLowerCase().trim()) !== -1)
  }
 
  console.log("filtered Array =>", filteredArray);
  if (filteredArray.length === 0 && searchTerm !== "") {
    filteredArray = [{username : "No results found!", avatarUrl : null}];
  }
  if (filteredArray.length === 0 && searchTerm === "") {
    filteredArray = [{username : "Enter a word to Search!", avatarUrl : null}];
  }

  
  return (
    <Card className={classes.root}>
      {filteredArray.map((item) => (
        <UserCard item={item} searchTerm={searchTerm}></UserCard>
      ))}
    </Card>
  );
};

export default PopUp;
