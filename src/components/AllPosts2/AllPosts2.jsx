import React , {useContext} from 'react';
import { AllUserDetailsContext } from '../../contexts/AllUserDetailsContext';
import Post2 from '../Post2/Post2';




const AllPosts2 = () => {
    const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
    
    let allThePosts = [];
    allUserDocs.forEach(doc => doc.posts.forEach(post => allThePosts.push(post)));
    console.log("all the posts => ", allThePosts)

    return (
        <>
        {allThePosts?.map(post => <Post2 post={post}/>)}
        </>
    )
}

export default AllPosts2
