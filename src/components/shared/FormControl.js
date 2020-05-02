import React, { useState, useEffect } from 'react';



export default function FormControl( { type, name, label, shouldValidate, validation, onStatusChange, onInputChanged }) {
    const [value, setValue] = useState('');
    const  [errorMesage, setErrorMessage] = useState('');


    function handleInputChange (e) {
        onStatusChange( 'isDirty', true);
        setErrorMessage('');
        onInputChanged( name, e.currentTarget.value);
        setValue(e.currentTarget.value);
    }

    useEffect ( () => {
        if(shouldValidate) {
            validateValue( value, validation, setErrorMessage, onStatusChange);
        }
    }, [name, shouldValidate, value, validation, onStatusChange]);
    
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
       onStatusChange( 'isInvalid', name);
       return;
    }

    if( validation.minLength && value.length <  validation.minLength){
        setErrorMessage(validation.messages.minLenght);
        onStatusChange( 'isInvalid', name);
        return;
    }
}