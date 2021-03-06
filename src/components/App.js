import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';


import RestList from './restaurants/RestList';
import EditRest from './restaurants/EditRest';
import DeleteRest from './restaurants/DeleteRest';
import AddRest from './restaurants/AddRest';
import AddReview from './restaurants/AddReview';
import Header from './shared/Header';
import RestDetails from './restaurants/RestDetails';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContext from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import Profile from './auth/Profile';
import UserReviews from './auth/UserReviews';





function App() {
  const [ user, setUser ] = useState( null);
   
  useEffect (() => {
    const user = localStorage.getItem('user');
    if(user) {
        setUser(JSON.parse(user));
    }
  }, []);
  return(
      <AuthContext.Provider value ={ { user, setUser } }>
          <BrowserRouter>
            < Header/>
            <Route exact path="/">
                <RestList />
            </Route>
            <Route exact path="/Pizza">
              <RestList specific= "Pizza"/>
            </Route>
            <Route exact path="/International">
              <RestList specific= "International"/>
            </Route>
            <Route exact path="/Romanian">
              <RestList specific= "Romanian"/>
            </Route>
            <Route path = "/reviews/:reviewId">
                <UserReviews/>
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
            <PrivateRoute path = "/profile">
                <Profile/>
            </PrivateRoute>
            <PrivateRoute path = "/reviews/add/:reviewId">
                <AddReview/>
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