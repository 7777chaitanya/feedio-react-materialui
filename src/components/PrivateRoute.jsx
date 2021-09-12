import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const PrivateRoute = ({component:Component,handleAllPostsUpdateDeleteOptimistically,handleDummy,allPosts, ...rest}) => {
    const {currentUser}= useAuth();
    return (
        
        <Route
        {...rest} 
       
        >
       { currentUser ? (<Component handleAllPostsUpdateDeleteOptimistically={handleAllPostsUpdateDeleteOptimistically} handleDummy={handleDummy} allPosts={allPosts}/>)  : <Redirect to="/login"/>}

        
        </Route>
    
    );
}

export default PrivateRoute