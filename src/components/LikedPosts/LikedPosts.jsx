import React, { useContext } from "react";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import Post2 from "../Post2/Post2";

const LikedPosts = () => {
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
    currentUserDoc.likedPosts?.forEach((id) => {
      if (post.id === id) {
        likedPosts.push(post);
      }
    });
  });
  likedPosts?.sort(function (a, b) {
    return b.date.toDate() - a.date.toDate();
  });

  console.log("liked Posts =>", likedPosts);

  return (
    <div>
      LikedPosts
      {likedPosts?.map((post) => (
        <Post2 post={post} />
      ))}
    </div>
  );
};

export default LikedPosts;
