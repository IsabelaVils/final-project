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

    const isInvalid = await validateFormData();

    if(!isInvalid) {
        setDirty (false);
        try { 
            
            const res = await axios.get ('http://localhost:3002/users?username='
            + formData.username + '&password=' + formData.password);
            if (res.data.lenght) {
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
            
       <br/>
    
      <label htmlFor="username" >User</label>
      <div className="icon">
        <input 
           onChange= { handleInputChange } 
           value ={ formData.username } 
           type="text" 
           
           id="username"  
           placeholder="Enter username"
        />
        
     </div>
  <br/>
  
  
     <label htmlFor="password" >Password</label>
     <div className="icon">
        <input 
           onChange= { handleInputChange}  
           value ={ formData.password }
           type="password" 
           id="password" 
           placeholder="Enter password"
        />
        
        
     </div>
  
  <br/>
 
   <br/>
     <button type="submit" className="btn" > Login </button>

</form>
    )
}

export default Login;



