import React, { useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from './AuthContext';

const errorMessages = {
  'username' : 'you must enter a username',
  'password' : 'you must enter a password',
  
}

function Login() {

  const [ formData, setFormData] = useState({
    'username' : '',
    'password' : '',
    
});

const [formError, setFormError] = useState({
    'username' : '',
    'password' : ''
});

const [isSuccesfull, setSuccesfull] = useState(false);
const [ isDirty, setDirty] = useState (false);
const [ globalErrorMessage, setGlobalErrorMessage ] = useState(''); 
const { user, setUser } = useContext(AuthContext);

  async function handleSubmit (e) {
    e.preventDefault();
    setGlobalErrorMessage('');
    setSuccesfull(false);
    const isInvalid = validateFormData();

    if(!isInvalid) {
        setDirty (false);
        let res;
        try { 
            res = await axios.get ('http://localhost:3002/users?username='
            + formData['username'] + '&password=' + formData['password']);
            if(res.data.lenght) {
                setUser(res.data.username);
                localStorage.setItem('user', res.data.username);   
                console.log(res);
                setSuccesfull(true);
            } else {
              setGlobalErrorMessage('Wrong user or password!');
            }
        } catch (e) { 
            console.log(e);
        }  
    }             
}

function validateFormData () {
  const inputs= [ 'username', 'password'];
  const newError= { ...formError };
  let isInvalid = false;

  for(const input of inputs){
      if(!formData[input]) {
            newError[input]= errorMessages[input];
            isInvalid = true;
      }
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


  setFormError(newError);
} 


    return (
      <form onSubmit={ handleSubmit } className="wrapper">
      < h1> Login </h1>
            { (globalErrorMessage ?
                 <div>
                     Wrong user or password!
                </div>
                 :
                null)
             }

            { ( isSuccesfull ? 
                <div> 
                    You logged in!
                </div>
                : null )}
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
     </div>
  
  <br/>
 
   <br/>
     <button type="submit" className="btn" disabled = { ! isDirty }> Login </button>

</form>
    )
}

export default Login;


