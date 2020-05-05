
import React, { useState, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';

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

    const [isSuccesfull, setSuccesfull] = useState(false);
    const [ isDirty, setDirty] = useState (false);

    const [ globalErrorMessage, setGlobalErrorMessage ] = useState(''); 
    
    const { user, setUser } = useContext(AuthContext);
    
    
   async function handleSubmit (e) {
        e.preventDefault();
        setGlobalErrorMessage('');
        setSuccesfull(false);

        const isInvalid = validateFormData() || await checkUser();

        if(!isInvalid) {
            setDirty (false);
            let res;
            try { 
                
                res = await axios.post ('http://localhost:3002/users', formData)
                setUser(res.data.username);
                localStorage.setItem('user', res.data.username);   
                console.log(res);
                setSuccesfull(true);
            } catch (e) { 
                console.log(e.response);
            }  
        }             
    }

    async function checkUser () {
        const sameUser= await axios.get('http://localhost:3002/users?username=' + formData.username)
            .then(res => res.data );
        if (sameUser.length){
            setGlobalErrorMessage('User already exists');
            return true;
        }
        
        return false;
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

                        { (globalErrorMessage ?
                            <div status= "error">
                                User already exists!
                            </div>
                            :
                            null)

                        }
            
                        { ( isSuccesfull ? 
                            <div status ="succes" > 
                                Your user was created!
                            </div>
                            : null )}
                   <br/>
                   { setGlobalErrorMessage }
                
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
                    <div className ="invalid-feedback" status= "error">
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
                    <div className ="invalid-feedback" status= "error">
                     { formError.password }
                    </div>
                 </div>
              
              <br/>
              
              
                 <label htmlFor="retype-password"  id="succes">Retype Password</label>
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
                  <div className ="invalid-feedback" status= "error">
                     { formError['retype-password'] }
                     { formError['retype-password']  ? <br/> : ''}
                     { formError['different-passwords']}
                  </div>
                </div>
             
               <br/>
                 <button type="submit" className="btn" disabled = { ! isDirty }> Register </button>

          </form>
        </>
    );
}

export default Register;

