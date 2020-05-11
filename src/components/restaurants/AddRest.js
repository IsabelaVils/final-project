import React, { useState, useContext } from 'react';
import axios from 'axios';


//import './register.css';
import '../Delivery.css';
import  AuthContext from '../auth/AuthContext';



function AddRest () {
    const [ formData, setFormData] = useState({
        'name' : '',
        'adress' : '',
        'telephone':'',
        'program':''
    });
    const [isSuccesfull, setSuccesfull] = useState(false);
    const [ restaurant, setRestaurant] = useState('');
    const { user, setUser } = useContext(AuthContext);
    
    async function handleSubmit (e) {
        e.preventDefault();
        console.log(formData);
        
         setSuccesfull(false);
         //if(!isInvalid) {
           // setDirty (false);
            let res;
            try { 
                const res = await axios ('http://localhost:3002/restaurants',{
                    method: 'POST',
                    data: formData,
                });
                setRestaurant(res.data);
                console.log(res);
                setSuccesfull(true);
            } catch (e) { 
                console.log(e.response);
            }  
        //}             
    }

   // function validateFormData () {
       // const inputs= [ 'name', 'adress', 'telephone', 'program', 'specific'];
      
        //let isInvalid = false;

       // for(const input of inputs){
           // if(!formData[input]) {
                  //newError[input]= errorMessages[input];
                 // isInvalid = true;
           // }
        //}
         //   return isInvalid;
   // }

    function handleInputChange (e) {

        //setDirty(true);
        setFormData({ 
            ...formData,    
            [e.currentTarget.id]: e.currentTarget.value
        }); 
    } 

    return (
        <>
            <form onSubmit={ handleSubmit } className="wrapper">
                  < h1> Add restaurant</h1>
                  <label htmlFor="name" >name</label>
                    <input 
                       onChange= { handleInputChange}  
                       value ={ formData.name }
                       type="name" 
                       id="name" 
                       placeholder="Name"
                    />
                     <br/>
                    <label htmlFor="adress" >adress</label>
                    <input 
                       onChange= { handleInputChange}  
                       value ={ formData.adress }
                       type="adress" 
                       id="adress" 
                       placeholder="Enter adress"
                    />
                     <br/>
                    <label htmlFor="telephone" >Telephone</label>
                    <br/>
                    <label htmlFor="telephone" >telephone</label>
                    <input 
                       onChange= { handleInputChange}  
                       value ={ formData.telephone }
                       type="telephone" 
                       id="telephone" 
                       placeholder="Telephone"
                    />
                     <br/>
                     <label htmlFor="program" >Program</label>
                    <input 
                       onChange= { handleInputChange}  
                       value ={ formData.program }
                       type="program" 
                       id="program" 
                       placeholder="program"
                    />
                     <br/>
                     <label htmlFor="specific">Specific</label>
                    <input 
                       onChange= { handleInputChange}  
                       value ={ formData.specific }
                       type="specific" 
                       id="specific" 
                       placeholder="specific"
                    /> 
                    <br/>
                 <button type="submit" className="btn" > ADD </button>

          </form>
        </>
    );
}

export default AddRest;

