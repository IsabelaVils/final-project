import React, { useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from './AuthContext';
import FormControl from '../shared/FormControl';


function Login() {

const [isSuccesfull, setSuccesfull] = useState(false);
const [ status, setStatus ] = useState ({
    isInvalid: false,
    isDirty: false,
});

const [ shouldValidate,  setShouldValidate] = useState( false);
const [ globalErrorMessage, setGlobalErrorMessage ] = useState(''); 

console.log(status)
function handleStatusChange( statusName, value) {
    setStatus({...status, [statusName]: value });
}

const { user, setUser } = useContext(AuthContext);

  async function handleSubmit (e) {
    e.preventDefault();

    setShouldValidate(true);

    setGlobalErrorMessage('');
    setSuccesfull(false);

    if(!status.isInvalid) {
        setStatus ({ ...status, isDirty: false });
        try { 
            
            const res = await axios.get ('http://localhost:3002/users?' + { });
            setUser(res.data.username);
            localStorage.setItem('user', res.data.username);   
            console.log(res);
            setSuccesfull(true);
        } catch (e) { 
            setGlobalErrorMessage(e.response);
        }  
    }             
}



    return (
      <form onSubmit={ handleSubmit } className="wrapper">
          < h1> Login </h1>

                { ( isSuccesfull ? 
                    <div> 
                        Your logged in!
                    </div>
                    : null )}
          <br/>

          < FormControl 
              type= "text" 
              name="username" 
              label="Username" 
              validation= { { 
                  required: true, 
                  messages :{ 
                    required:"The username is req",
                  }
            } }
            shouldValidate = { shouldValidate }
            onStatusChange= { handleStatusChange }
            //setInvalid = { setInvalid } setDirty, setFormdata, 
          />
                  
          <br/>
          < FormControl 
              type= "password" 
              name="password" 
              label="Password" 
              validation= { { 
                  required: true, 
                  messages :{ 
                    required:"The pass is req",
                  }
            } }
            shouldValidate = { shouldValidate }
          />
          <button type="submit" className="btn" disabled = { ! status.isDirty }> Login </button>

</form>
    )
}

export default Login;



