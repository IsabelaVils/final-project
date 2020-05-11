import React, {useEffect, useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from './AuthContext';

function UserReviews() {
  const [userReview, setUserReview] = useState('');
  const [ reviews, setReviews]= useState('');
  
  const [user, setUser] = useState('');


  async function getReviews(id){
   
        const res = await axios('http://localhost:3002/reviews')
        
        setReviews(res.data);
        console.log(user, reviews);
        
    }
       
  

    return(<div>
       <p>{ reviews.description} </p> 
        
    </div>)
}
  

export default UserReviews;