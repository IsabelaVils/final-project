import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import UserReviews from './UserReviews';

import AuthContext from './AuthContext';

function Profile () {
    const { user } = useContext(AuthContext);
    const {reviewId } = useParams();
    const [ reviews, setReviews ] = useState('');
 

    
    async function getReviewByUser (id) {
        try {
            const promises = [];
            promises.push(axios('http://localhost:3002/users/' + id).then (res => res.data));
            promises.push(axios ('http://localhost:3002/reviews?userId=' + id).then (res => res.data));

            const [ user, reviews ]= await Promise.all(promises);
          
            setReviews(reviews);
            console.log(reviews, user);
            
        } catch(e) {
        console.warn(e);
        }
    }
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