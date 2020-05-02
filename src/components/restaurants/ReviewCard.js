import React from 'react';


import '../Delivery.css';

function ReviewCard(props) {
   const opinion = props.opinion;
  
  
    return (
        < div className="card">
           <h5 > Review :</h5>  
            <p>{ opinion.description }</p>
         </div>        
    )
}

export default ReviewCard;
