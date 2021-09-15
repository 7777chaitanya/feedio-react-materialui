import React , {useContext} from 'react';
import { AllUserDetailsContext } from '../../contexts/AllUserDetailsContext';
import { CurrentUserDetailsContext } from '../../contexts/CurrentUserDetailsContext';
import Post2 from '../Post2/Post2';




const AllPosts2 = () => {
    const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
    const [currentUserDoc, setCurrentUserDoc] = useContext(
        CurrentUserDetailsContext
      );
    
    let allThePosts = [];
    allUserDocs.forEach(doc => doc.posts.forEach(post => allThePosts.push(post)));

    allThePosts?.sort(function(a,b){
        
        return b.date.toDate() - a.date.toDate();
      });
    

    return (
        <>
        <h5>current User docs.likedPosts</h5>
        {currentUserDoc?.likedPosts?.map(post => <h6>{post}</h6>)}

        <h5>All User docs.likedPosts</h5>
        {allUserDocs[1]?.likedPosts?.map(post => <h6>{post}</h6>)}

        
        {allThePosts?.map(post => <Post2 post={post}/>)}
        </>
    )
}

export default AllPosts2
