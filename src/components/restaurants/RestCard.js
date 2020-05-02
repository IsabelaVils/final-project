import React from 'react';
import { Link } from "react-router-dom";

//import './card.css';
import '../Delivery.css';

function RestCard(props) {
   const local = props.local;
  
  
    return (
        < div className="card">
            <img className="img" src= { local.poster}  alt= "Restaurant Poster"/>
            <h5 > { local.name }</h5>  
            <p className="cardText">Specific:{ local.specific }  
            <br/>
            Telefon: {local.telephone} 
            <br/>
  
            < Link to = { '/restaurants/' + local.website}  className= "web"> Website </Link> 
            <br/>
            <button>
                < Link to = { '/restaurants/' + local.id } className= "details"> Details</Link> 
            </button>
            </p>
             
        </div>        
     
    )
}

export default RestCard;
