import React, { useContext } from "react";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import Post2 from "../Post2/Post2";

const SavedPosts = () => {
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  let allPosts = [];
  allUserDocs?.forEach((doc) => {
    doc?.posts?.forEach((doc) => {
      allPosts?.push(doc);
    });
  });
  let savedPosts = [];
  allPosts?.forEach((post) => {
    currentUserDoc.savedPosts?.forEach((id) => {
      if (post.id === id) {
        savedPosts.push(post);
      }
    });
  });
  savedPosts?.sort((a,b) => {
    let c,d;
    if(a.date.getMonth){
        c = a.date
    }
    if(b.date.getMonth){
        d = b.date
    }
    if(!a.date.getMonth){
        c=a.date.toDate();
    }
    if(!b.date.getMonth){
        d=b.date.toDate()
    }
    
    return d - c;
  })

  console.log("saved Posts =>", savedPosts);

  return (
    <div>
      SavedPosts
      {savedPosts?.map((post) => (
        <Post2 post={post} />
      ))}
    </div>
  );
};

export default SavedPosts;
