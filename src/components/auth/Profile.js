import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import UserReviews from './UserReviews';

import AuthContext from './AuthContext';

function Profile () {
    const { user, setUser } = useContext(AuthContext);

    if(user){
    return(
        <div>
            < a href='/add'>Add review</a>
            Review
           <UserReviews/>
        </div>)
    } else{
        return <h1>Loading...</h1> 
    }
}

export default Profile;