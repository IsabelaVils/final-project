import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import AuthContext from '../auth/AuthContext';

export default function EditRest() {
    const { user } = useContext(AuthContext);
    const { restaurantId } = useParams();
    const [ restaurant, setRestaurant] = useState(null);
    
    async function getRestById (id) {
        try {
            const res = await axios('http://localhost:3002/restaurants/' + id)
            setRestaurant(res.data);
        } catch(e) {
        console.warn(e);
        }
    }
   
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios('http://localhost:3002/restaurants/' + restaurantId, {
                method: 'PUT',
                data: qs.stringify(restaurant)
                //data: qs.stringify({ 'Name': restaurant.name)
            });
            console.log(res[0]);
            console.log(res[1]);
            console.log(res[2]);
            
            setRestaurant(res.data);
        } catch(e) {
        console.warn(e);
        }
   
    }

    function handleInputChange (e) {
        setRestaurant( {...restaurant, name: e.currentTarget.value });
    }

    useEffect(() => { 
        getRestById(restaurantId);
    }, [restaurantId]);

    if(!restaurant) {
        return <h1>Loading...</h1>
    }
    
    return (
        <div>
        <form onSubmit={ handleSubmit } className="wrapper">
            <h1> Edit {restaurant.name} </h1>  
                <div className="icon">
                    <label htmlFor="Name">Name</label>
                    <input 
                    onChange= { handleInputChange } 
                    value ={ restaurant.name } 
                    type="text" 
                    className = { 'form-control'  }
                    id="Name"  
                    placeholder="Edit name"
                    />
                </div>
                <div className="icon">
                    <label htmlFor="address">Address</label>
                    <input 
                    onChange= { handleInputChange } 
                    value ={ restaurant.address } 
                    type="text" 
                    className = { 'form-control'  }
                    id="address"  
                    placeholder="Edit address "
                    />
                </div>
                <div className="icon">
                    <label htmlFor="telephone">Telephone</label>
                    <input 
                    onChange= { handleInputChange } 
                    value ={ restaurant.telephone } 
                    type="text" 
                    className = { 'form-control'  }
                    id="telephone"  
                    placeholder="Edit telephone"
                    />
                </div>
                <br/>
                <div className="icon">
                    <label htmlFor="program">Program</label>
                    <input 
                    onChange= { handleInputChange } 
                    value ={ restaurant.program } 
                    type="text" 
                    className = { 'form-control'  }
                    id="program"  
                    placeholder="Edit program"
                    />
                </div>
                <div className="icon">
                    <label htmlFor="specific">Specific</label>
                    <input 
                    onChange= { handleInputChange } 
                    value ={ restaurant.specific } 
                    type="text" 
                    className = { 'form-control'  }
                    id="specific"  
                    placeholder="Edit specific"
                    />
                </div>
                <br/>
                <button type="submit" className="btn details" > Save </button>
            </form>
        </div>
    )
}
