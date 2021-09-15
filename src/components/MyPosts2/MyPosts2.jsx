import React,{useContext} from 'react'
import { CurrentUserDetailsContext } from '../../contexts/CurrentUserDetailsContext';
import Post2 from "../Post2/Post2"

const MyPosts2 = () => {
    const [currentUserDoc, setCurrentUserDoc] = useContext(CurrentUserDetailsContext);
    let myPosts = currentUserDoc?.posts?.sort(function(a,b){
        
        return b.date.toDate() - a.date.toDate();
      });
    return (
        <div>
            MyPosts2
            {myPosts?.map(post => 
               <Post2 post={post}/> 
                )}
        </div>
    )
}

export default MyPosts2
