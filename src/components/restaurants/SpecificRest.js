import React, { useEffect } from 'react';
import axios from 'axios';


function specificRest( {specific} ){
    const [restaurant, setRestaurant] = useState([]);
    
    async function getSpecific() {
        const url='http://localhost:3002/restaurants';
        if(specific) { url +='?specific=' + specific   
        }
        const res = await axios (url);
        console.log(res);
        setRestaurant(res.data);

    }
    return(
        <h1>Specific</h1>
    )
}

export default specificRest;
