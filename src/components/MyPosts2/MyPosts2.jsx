import React,{useContext} from 'react'
import { CurrentUserDetailsContext } from '../../contexts/CurrentUserDetailsContext';
import Post2 from "../Post2/Post2"

const MyPosts2 = () => {
    const [currentUserDoc, setCurrentUserDoc] = useContext(CurrentUserDetailsContext);
    console.log("myposts2 =>",currentUserDoc)
    return (
        <div>
            MyPosts2
            {currentUserDoc?.posts?.map(post => 
               <Post2 post={post}/> 
                )}
        </div>
    )
}

export default MyPosts2
