import React, { useContext } from "react";
import { AllUserDetailsContext } from "../../contexts/AllUserDetailsContext";
import { CurrentUserDetailsContext } from "../../contexts/CurrentUserDetailsContext";
import Post2 from "../Post2/Post2";

const AllPosts2 = () => {
  const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
  const [currentUserDoc, setCurrentUserDoc] = useContext(
    CurrentUserDetailsContext
  );

  let allThePosts = [];
  allUserDocs?.forEach((doc) =>
    doc.posts.forEach((post) => allThePosts?.push(post))
  );
  console.log("all the posts => ", allThePosts);

  allThePosts = allThePosts?.sort((a, b) => {
    let c, d;
    if (a.date.getMonth) {
      c = a.date;
    }
    if (b.date.getMonth) {
      d = b.date;
    }
    if (!a.date.getMonth) {
      c = a.date.toDate();
    }
    if (!b.date.getMonth) {
      d = b.date.toDate();
    }

    return d - c;
  });

  return (
    <>
      {allThePosts?.map((post) => (
        <Post2 post={post} />
      ))}
    </>
  );
};

export default AllPosts2;
