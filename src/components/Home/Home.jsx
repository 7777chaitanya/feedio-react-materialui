import React from 'react';
import {useAuth} from "../../contexts/AuthContext";
import Wassup from "../Wassup/Wassup"

const Home = () => {
    const {currentUser} = useAuth();
    return (
        <div>
            <h1>Current User is : {currentUser.email}</h1>
            <Wassup/>
        </div>
    )
}

export default Home
