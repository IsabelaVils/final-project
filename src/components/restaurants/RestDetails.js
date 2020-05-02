import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../auth/AuthContext';

//import './details.css';
import '../Delivery.css';


function RestDetails() {
    const {restaurantId } = useParams();
    const [ restaurant, setRestaurant] = useState(null);
    
    const { user} = useContext(AuthContext);

    async function getRestById (id) {
        try {
            const res = await axios('http://localhost:3002/restaurants/' + id)
            setRestaurant(res.data);
        } catch(e) {
        console.warn(e);
        }
    }
  
    useEffect(() => { 
        getRestById(restaurantId);
    }, [restaurantId]);

    if(restaurant) {
        return(
            < div className= "detail-wrapper">
                <div className="image">
                   <img className="cardImg" src= { restaurant.poster}  alt= "Restaurant Poster"/>
                </div>
                <div className= "info"> 
                    <h3> {restaurant.name} </h3>
                    <p className="text-detalii"> <span className= "bold">Specific: </span>{restaurant.specific} 
                    <br/>
                    <span className= "bold">Adresa: </span>{restaurant.address} 
                     <br/>
                     <span className= "bold">Telefon: </span>{restaurant.telephone} 
                     <br/>
                     <span className= "bold">Program: </span>{restaurant.program} 
                    <br/>
                    <span className= "bold">Website:</span> {restaurant.website} 
                    </p>
                    {   user ?
                           < Link to= { "/restaurants/edit/" + restaurant.id } > Edit  </Link>
                        : 
                            null
                    }
                    <br/>
                    <h3>Reviews:</h3>
                    <br/>
                    {   user ?
                           < Link to= { "/restaurants/add/" + restaurant.id } > Add  </Link>
                        : 
                            null
                    }
                    {   user ?
                           < Link to= { "/restaurants/delete/" + restaurant.id } > Delete  </Link>
                        : 
                            null
                    }
                    
                     <br/>
                    
                        </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
}

export default RestDetails;