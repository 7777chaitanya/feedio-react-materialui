import React, { useContext } from "react";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import NoPostsCard from "../NoPostsCard/NoPostsCard";
import Post2 from "../Post2/Post2";

const LikedPosts = ({profileBelongsTo}) => {
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
  let likedPosts = [];
  allPosts?.forEach((post) => {
    profileBelongsTo.likedPosts?.forEach((id) => {
      if (post.id === id) {
        likedPosts.push(post);
      }
    });
  });
  likedPosts?.sort((a,b) => {
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

  console.log("liked Posts =>", likedPosts);

  return (
    <>
      {(likedPosts.length === 0) && <NoPostsCard text="There are no Liked Posts!" /> }

     
      { likedPosts.length !== 0 && likedPosts?.map((post) => (
        <Post2 post={post} />
      ))}


      
    </>
  );
};

export default LikedPosts;
