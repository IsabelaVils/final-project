import React, { useState, useEffect } from 'react';
import axios from 'axios';


import RestCard from './RestCard';
//import './list.css';
import '../Delivery.css';

function RestList ( { specific }) {
    
    let [restaurants, setRestaurants] = useState ([]);
   

    

    useEffect (() => {
      getRestaurants();
    }, []);


    // async function getRestaurants() {
    //   const res = await axios('http://localhost:3002/restaurants');
    //   setRestaurants(res.data);
  
    // }

    

    async function getRestaurants() {
      let res;
      if(specific){
        res = await axios('http://localhost:3002/restaurants?specific=' + specific);
      } else {
        res = await axios('http://localhost:3002/restaurants');
      }
      setRestaurants(res.data);

       
    }
    return (
      <div className= "container">
         { restaurants.length ? 
             restaurants.map(restaurant => <RestCard local = { restaurant } key = { restaurant.id } />)
                : "Loading..."}
        
      </div>
        
    );
}
export default RestList;