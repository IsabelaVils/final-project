import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

//import './style.css';
import '../Delivery.css';
import AuthContext from '../auth/AuthContext';



function Header (props) {
    const history = useHistory();
    const { user, setUser } = useContext(AuthContext);
    const [searchInput, setSearchInput] = useState('');
    

    //function handleSearch(e){
      //  setSearchInput(e.currentTarget.value);
       // history.push('/q?=' + e.currentTarget.value)
   // }

    function handleLogout (e) {
        e.preventDefault();
        setUser(null);
        
        localStorage.removeItem('user');
        history.push('/');
    }

    function handleSpecifiChange(e) {
        history.push('/'+e.currentTarget.value)
    }
    
    return (
        < header>
            <ul className="header">
                < li className = "box-1"> 
                </li> 
                
                <li className = "box-3" > 
                    <select onChange={handleSpecifiChange} > 
                        <option>
                            Specific
                        </option>
                        <option value="Pizza">
                            Pizza
                        </option>
                        <option value="International">
                            International
                        </option>
                        <option value="Romanian">
                            Romanian
                        </option>
                    </select>
                  
                </li>
                <li className = "box-2">
                </li>
                
                <li className = "box-2">
                 </li>

                <li className = "box-5">
                     < NavLink exact to ="/" className= "headerLink"  activeClassName= "active"> Home </NavLink>
                </li>
                
                <li className= "box-2"> 
                </li>

                <li className= "box-7"> 
                    {( user ?
                    <>
                        <span>Welcome {user.username} </span>
                        < a href="/" className= "headerLink active"  onClick={ handleLogout }>Logout</a>
                        <NavLink exact to="/profile" className= "headerLink " activeClassName= "active"> Profile </NavLink>
                    </>
                   :
                        <>
                            <NavLink exact to="/login" className= "headerLink " activeClassName= "active"> Login </NavLink>
                            <NavLink exact to="/register" className= "headerLink" activeClassName= "active"> Register </NavLink>
                        </>
                    )}
                 </li>

                 <li className = "box-9">
                     
                </li>
            </ul>       
        </header>
    );

}
 export default Header;

