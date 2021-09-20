import React, { useContext } from "react";
import useStyles from "./styles";
import UserCard from "../UserCard/UserCard";
import { Card } from "@material-ui/core";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";


const PopUp = ({ searchTerm, closeDisplayPopUp }) => {
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);

  const classes = useStyles();


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
        <UserCard item={item} searchTerm={searchTerm} closeDisplayPopUp={closeDisplayPopUp}></UserCard>
      ))}
    </Card>
  );
};

export default PopUp;
