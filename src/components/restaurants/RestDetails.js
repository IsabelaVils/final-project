import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../auth/AuthContext';

//import './details.css';
import '../Delivery.css';

function RestDetails() {
    const {restaurantId } = useParams();
    const [ restaurant, setRestaurant] = useState(null);
    const [ reviews, setReviews ] = useState([]);
    const { user} = useContext(AuthContext);

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
                    <p className= "bold">Adresa: {restaurant.address} </p>
                        
                            <span className= "bold">Telefon: </span>{restaurant.telephone} 
                        <br/>
                        <span className= "bold">Program: </span>{restaurant.program} 
                        <br/>
                            <span className= "bold">Website:</span> {restaurant.website} 
                        <br/>
                            <span className= "bold">Special offer:</span> {restaurant.offer}
                        <br/>
                            <span className= "bold">Reviews:</span>  
                        <br/>
                    </p>
                     <div> 
                         { reviews.map(review => <p>{ review.description} </p> )}
                    
                     </div>  
                     <p>
                            {   user ?
                                < Link to= { "/reviews/add/" + reviews.id }className="btn" > Add Review </Link>
                                : 
                                 null
                            }
                        </p>
                     <div className="box">
                         <p>
                            {   user ?
                                < Link to= { "/restaurants/edit/" + restaurant.id } className="btn" > Edit  </Link>
                                : 
                                null
                            }
                        </p>
                        <p>
                            {   user ?
                                < Link to= { "/restaurants/add/" + restaurant.id }className="btn" > Add  </Link>
                                : 
                                 null
                            }
                        </p>
                        <p>
                            {   user ?
                                < Link to= { "/restaurants/delete/" + restaurant.id }  className="btn"> Delete  </Link>
                                : 
                                 null
                            }
                            </p>
                        </div>
                    </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
}

export default RestDetails;


