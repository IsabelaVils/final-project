import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import RestList from './restaurants/RestList';
import EditRest from './restaurants/EditRest';
import DeleteRest from './restaurants/DeleteRest';
import AddRest from './restaurants/AddRest';
import Header from './shared/Header';
import RestDetails from './restaurants/RestDetails';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContext from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';



function App() {
  const [ user, setUser ] = useState( null);
   
  useEffect (() => {
    const user = localStorage.getItem('user');
    if(user) {
        setUser(user);
    }
  }, []);
  return(
      <AuthContext.Provider value ={ { user, setUser } }>
          <BrowserRouter>
            < Header/>
            <Route exact path="/">
                <RestList/>
            </Route>
            <Route exact  path = "/restaurants/:restaurantId">
                <RestDetails/>
            </Route>
            <PrivateRoute path = "/restaurants/edit/:restaurantId">
                <EditRest/>
            </PrivateRoute>
            <PrivateRoute path = "/restaurants/delete/:restaurantId">
                <DeleteRest/>
            </PrivateRoute>
            <PrivateRoute path = "/restaurants/add/:restaurantId">
                <AddRest/>
            </PrivateRoute>
            <PrivateRoute path = "/restaurants/add/:restaurantId">
                <AddRest/>
            </PrivateRoute>
            <Route path = "/register">
                <Register/>
            </Route>
            <Route path = "/login">
                <Login/>
            </Route>
            
          </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;