import React , {useContext} from 'react';
import { AllUserDetailsContext } from '../../contexts/AllUserDetailsContext';
import Post2 from '../Post2/Post2';




const AllPosts2 = () => {
    const [allUserDocs, setAllUserDocs] = useContext(AllUserDetailsContext);
    
    let allThePosts = [];
    allUserDocs.forEach(doc => doc.posts.forEach(post => allThePosts.push(post)));

    allThePosts?.sort(function(a,b){
        
        return b.date.toDate() - a.date.toDate();
      });
    

    return (
        <>
        {allThePosts?.map(post => <Post2 post={post}/>)}
        </>
    )
}

export default AllPosts2
