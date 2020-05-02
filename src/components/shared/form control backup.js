import React, { useState, useEffect } from 'react';



export default function FormControl( { type, name, label, validation, shouldValidate, onStatusChange }) {
    const [value, setValue] = useState('');
    const  [errorMesage, setErrorMessage] = useState('');
 
    function handleInputChange (e) {
        onStatusChange( 'isDirty', true);
         setValue(e.currentTarget.value);
    }

    useEffect ( () => {
        if(shouldValidate) {
            validateValue( value, validation, setErrorMessage, onStatusChange);
        }
    }, [ shouldValidate, value, validation]);

    

    //const val = { 
       // required: true, 
      //  minLenght: 6,
      //  messages: { 
      //  required:"The pass is req",
      //   minLenght:"your pass must be at least 6 characters "
      // }
    // }
    
    return (
        <div>
            <label htmlFor= { name } > { label }</label>
            <div className="icon">
                <input 
                    onChange= { handleInputChange}  
                    value ={ value }
                    type= { type } 
                    className = { 'form-control' + (errorMesage ? ' is-invalid' : '' ) }
                    id= { name }
                    placeholder= { label }
                />
                <i className="fa fa-unlock-alt" aria-hidden="true"/>
            <div className ="invalid-feedback">
                    { errorMesage }
            </div>
        </div>
  
        </div>
    )
}


function validateValue( value, validation, setErrorMessage, onStatusChange) {
    if(validation.required && !value){
       setErrorMessage(validation.messages.required);
       onStatusChange( 'isInvalid', true);
    }

    if( validation.minLength && value.length <  validation.minLength){
        setErrorMessage(validation.messages.minLenght);
        onStatusChange( 'isInvalid', true);
    }
}