import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

import '../Delivery.css';
import  AuthContext from '../auth/AuthContext';
import { useParams } from 'react-router-dom';



function AddReview () {
    const [ formData, setFormData] = useState({
        'description' : ''
        
    });
    const {restaurantId } = useParams();
    const [isSuccesfull, setSuccesfull] = useState(false);
    const [ reviews, setReviews ] = useState([]);
    const [ restaurant, setRestaurant] = useState('');
    const { user, setUser } = useContext(AuthContext);
    async function getRestById (id) {
        try {
            const promises = [];
            promises.push(axios('http://localhost:3002/restaurants/' + id).then (res => res.data));
            promises.push(axios ('http://localhost:3002/reviews?restaurantId=' + id).then (res => res.data));

            const [ restaurant, reviews ]= await Promise.all(promises);
            setRestaurant(restaurant);
            setReviews(reviews);
            console.log(restaurant, reviews);
            
        } catch(e) {
        console.warn(e);
        }
    }

    useEffect(() => { 
        getRestById(restaurantId);
    }, [restaurantId]);
    
    async function handleSubmit (e) {
        e.preventDefault();
        console.log(formData);
        
         setSuccesfull(false);
         
            let res;
            try { 
                const res = await axios ('http://localhost:3002/offers',{
                    method: 'PATCH',
                    data: formData,
                });
                setReviews(reviews);
                setRestaurant(res.data);
                console.log(res);
                setSuccesfull(true);
            } catch (e) { 
                console.log(e.response);
            }  
                   
    }

   

    function handleInputChange (e) {
        setFormData({ 
            ...formData,    
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
                       value ={ formData.description }
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

