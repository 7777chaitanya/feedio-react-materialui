const addPostLikedByInCurrentUserDoc = (
  likedByObj,
  currentUserDoc,
  setCurrentUserDoc,
  post
) => {
  let currentUserDocCopy = { ...currentUserDoc };
  // adding the post id to the likedPosts array of the currentUserDoc
  if (currentUserDocCopy.likedPosts.indexOf(post.id) === -1) {
    currentUserDocCopy.likedPosts.push(post.id);
  }
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
  console.log("current User Doc after state update =>", currentUserDoc);
};

export default addPostLikedByInCurrentUserDoc;
