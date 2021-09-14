let localCurrentUserDocRef = { ...currentUserDoc };

let LikedPostsCopy = [...currentUserDoc.likedPosts];
if (LikedPostsCopy.indexOf(post.id) === -1) {
  LikedPostsCopy.push(post.id);
  localCurrentUserDocRef.likedPosts = [...LikedPostsCopy];
}

let postToModify = localCurrentUserDocRef.posts.find(
  (iteratingPost) => iteratingPost.id === post.id
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
// console.log(localCurrentUserDocRef);
setCurrentUserDoc({ ...localCurrentUserDocRef });
console.log("currentUserDoc completed=>", currentUserDoc);

//update likedBy in allUser Docs
let localAllUserDocsCopy = [...allUserDocs];

let referenceOfCurrentUserDocInAllUserDocsCopy = localAllUserDocsCopy.find(
  (document) => document.username === currentUserDoc.username
);
const currentDocIndex = localAllUserDocsCopy.indexOf(
  referenceOfCurrentUserDocInAllUserDocsCopy
);
// console.log("index ===>",currentDocIndex);
localAllUserDocsCopy[currentDocIndex] = { ...localCurrentUserDocRef };
// console.log("localAllUserDocsCopy => ", localAllUserDocsCopy);

setAllUserDocs([...localAllUserDocsCopy]);

console.log("all users docs completed => ", allUserDocs);

//update likedBy array in db
updatePostLikedByAfterLikingInFirestore({ ...currentUserDoc });