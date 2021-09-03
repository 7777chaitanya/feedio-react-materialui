import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const PrivateRoute = ({component:Component,handleAllPostsUpdateDeleteOptimistically,allPosts, ...rest}) => {
    const {currentUser}= useAuth();
    return (
        
        <Route
        {...rest} 
       
        >
       { currentUser ? (<Component handleAllPostsUpdateDeleteOptimistically={handleAllPostsUpdateDeleteOptimistically} allPosts={allPosts}/>)  : <Redirect to="/login"/>}

        
        </Route>
    
    );
}

export default PrivateRoute