import React, { useContext, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';

//import './style.css';
import '../Delivery.css';
import AuthContext from '../auth/AuthContext';


function Header (props) {
    const history = useHistory();
    const { user, setUser } = useContext(AuthContext);
    

    function handleLogout (e) {
        e.preventDefault();
        setUser(null);
        
        localStorage.removeItem('user');
        history.push('/');
    }
    
    return (
        < header>
            <ul className="header">
                < li className = "box-1"> 
                </li>

                <li className = "box-2">
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
                        < a href="/" className= "headerLink active"  onClick={ handleLogout }>Logout</a>
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

