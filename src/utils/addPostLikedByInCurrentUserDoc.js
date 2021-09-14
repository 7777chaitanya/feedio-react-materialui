const addPostLikedByInCurrentUserDoc = (likedByObj,currentUserDoc, setCurrentUserDoc, post) => {
    let currentUserDocCopy = { ...currentUserDoc };
    let postToModify = currentUserDocCopy.posts.find(
      (onePost) => onePost.id === post.id
    );
    let flag = 0;
    postToModify.likedBy.forEach((i) => {
      if (i.username === likedByObj.username) {
        flag = 1;
      }
    });
    if (flag === 0) {
      postToModify.likedBy.push(likedByObj);
    }
    flag = 0;
    setCurrentUserDoc(currentUserDocCopy);

    console.log(currentUserDoc);
    console.log("ellam pugazhum enakkeh")
  };

export default addPostLikedByInCurrentUserDoc;