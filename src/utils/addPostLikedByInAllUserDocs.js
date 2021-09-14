const addPostLikedByInAllUserDocs = (likedByObj,
    allUserDocs,
    setAllUserDocs,
    post) =>{
     const allUserDocsCopy = [...allUserDocs];
     const referenceOfDocumentToAlter = allUserDocs.find(document => document.username === post.username);
     let postToModify = referenceOfDocumentToAlter.posts.find(
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
    setAllUserDocs(allUserDocsCopy)
    console.log("all User Docs after state update =>",allUserDocs)

  }

export default addPostLikedByInAllUserDocs;