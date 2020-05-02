import React, { useState, useContext } from 'react';
import axios from 'axios';

//import './register.css';
import '../Delivery.css';
import  AuthContext from './AuthContext';

const errorMessages = {
    'username' : 'you must enter a username',
    'password' : 'you must enter a password',
    'retype-password':'you must retype the pass',
    'different-passwords': 'you must enter the same password'
}

function Register () {
    const [ formData, setFormData] = useState({
        'username' : '',
        'password' : '',
        'retype-password':''
    });
    
    const [formError, setFormError] = useState({
        'username' : '',
        'password' : '',
        'retype-password':'',
        'different-passwords':''
    });

    const [isSuccesfull, setSuccesfull] = useState('false');
    const [ isDirty, setDirty] = useState ('false');

    const [ globalErrorMessage, setGlobalErrorMessage ] = useState(''); 
    
    const { token, setToken } = useContext(AuthContext);
    
    
   async function handleSubmit (e) {
        e.preventDefault();
        const isInvalid = validateFormData();

        if(!isInvalid) {
            try { 
                setDirty (false);
                const res = await axios ('http://localhost:3002/users',{
                    method: 'POST',
                    data: formData,
                });
                setToken(res.data.username);
                console.log(res);
                setSuccesfull(true);
            } catch (e) { 
                setGlobalErrorMessage(e.response.message);
            }  
        }             
    }

    function validateFormData () {
        const inputs= [ 'username', 'password', 'retype-password'];
        const newError= { ...formError };
        let isInvalid = false;

        for(const input of inputs){
            if(!formData[input]) {
                  newError[input]= errorMessages[input];
                  isInvalid = true;
            }
        }   
        
            if( formData.password !==  formData['retype-password']) {
                newError['different-passwords']= errorMessages['different-passwords']
                isInvalid = true;
            }
            setFormError(newError);
            return isInvalid;
    }

    function handleInputChange (e) {

        setDirty(true);
        setFormData({ 
            ...formData,    
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = {
            ...formError,
            [e.currentTarget.id]:'',
        };

        if(e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['different-passwords']= '';
        }

        setFormError(newError);
    } 

    return (
        <>
            <form onSubmit={ handleSubmit } className="wrapper">
                  < h1> Register</h1>
            
                        { ( isSuccesfull ? 
                            <div> 
                                Your user was created!
                            </div>
                            : '')}
                   <br/>
                
                  <label htmlFor="username" >User</label>
                  <div className="icon">
                    <input 
                       onChange= { handleInputChange } 
                       value ={ formData.username } 
                       type="text" 
                       className = { 'form-control' + (formError.username ? ' is-invalid' : '' ) }
                       id="username"  
                       placeholder="Enter username"
                    />
                    <i className="fa fa-user" aria-hidden="true"/>
                    <div className ="invalid-feedback">
                       { formError.username }
                    </div>
                 </div>
              <br/>
              
              
                 <label htmlFor="password" >Password</label>
                 <div className="icon">
                    <input 
                       onChange= { handleInputChange}  
                       value ={ formData.password }
                       type="password" 
                       className = { 'form-control' + (formError.password ? ' is-invalid' : '' ) }
                       id="password" 
                       placeholder="Enter password"
                    />
                    <i className="fa fa-unlock-alt" aria-hidden="true"/>
                    <div className ="invalid-feedback">
                     { formError.password }
                    </div>
                 </div>
              
              <br/>
              
              
                 <label htmlFor="retype-password" >Retype Password</label>
                 <div className="icon">
                    <input 
                       onChange= { handleInputChange } 
                       value ={ formData['retype-password'] } 
                       type="password" 
                       className = { 'form-control' + (formError['retype-passwords'] || formError['different-passwords'] ? ' is-invalid' : '' ) }
                       id="retype-password"
                       placeholder="Retype password" 
                    />
                  <i className="fa fa-unlock-alt" aria-hidden="true"/>
                  <div className ="invalid-feedback">
                     { formError['retype-password'] }
                     { formError['retype-password']  ? <br/> : ''}
                     { formError['different-passwords']}
                  </div>
                </div>
             
               <br/>
                 <button type="submit" className="btn" disabled = { ! isDirty }> Submit </button>

          </form>
        </>
    );
}

export default Register;

