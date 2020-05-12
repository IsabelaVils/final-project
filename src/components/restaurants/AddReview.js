import React, { useState, useContext, useEffect } from 'react';
import { useParams} from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import '../Delivery.css';
import  AuthContext from '../auth/AuthContext';

function AddReview () {
    const {restaurantId } = useParams();
    const [isSuccesfull, setSuccesfull] = useState(false);
    const [ reviews, setReviews ] = useState({
        description:''
    });
    const [ restaurant, setRestaurant] = useState('');

    const { user} = useContext(AuthContext);

    async function handleSubmit (e) {
        e.preventDefault();
        console.log(reviews);
         setSuccesfull(false);
            try { 
                const res = await axios.post ('http://localhost:3002/reviews',{...reviews, userId: user.id, restId: Number(restaurantId)});
            //nu imi ia si idRestaurant
            console.log(restaurantId);
                console.log(res);
                setSuccesfull(true);
            } catch (e) { 
                console.log(e.response);
            }             
    }
    function handleInputChange (e) {
        setReviews({ 
            ...reviews,    
            [e.currentTarget.id]: e.currentTarget.value
        }); 
    } 

    return (
        <>
            <form onSubmit={ handleSubmit } className="wrapper">
                  < h1> Add Review</h1>
                  <label htmlFor="description" >description</label>
                    <input 
                       onChange= { handleInputChange}  
                       value ={ reviews.description }
                       type="description" 
                       id="description" 
                       placeholder="description"
                    />
                     
                    <br/>
                 <button type="submit" className="btn" > ADD </button>

          </form>
        </>
    );
}

export default AddReview;

