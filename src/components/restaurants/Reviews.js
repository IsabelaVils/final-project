import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReviewCard from './ReviewCard';
//import './list.css';


function ReviewsList () {
   
    let [reviews, setReviews] = useState ([]);
    
    useEffect (() => {
      getReviews();
    }, []);

    async function getReviews() {
      const res = await axios('http://localhost:3002/reviews');
      setReviews(res.data);
  
    }
    return (
      <div className= "container">
        
         { reviews.length ? 
             reviews.map(review => <ReviewCard opinion = { review } key = { review.id } />)
                : "Loading..."}
        
      </div>
        
    );
}
export default ReviewList;
