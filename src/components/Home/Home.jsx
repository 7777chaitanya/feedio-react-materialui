import React from 'react';
import {useAuth} from "../../contexts/AuthContext"

const Home = () => {
    const {currentUser} = useAuth();
    return (
        <div>
            <h1>Current User is : {currentUser.email}</h1>
        </div>
    )
}

export default Home
