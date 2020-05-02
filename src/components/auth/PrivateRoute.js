import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from './AuthContext';

export default function PrivateRoute({ children, ...rest}) {
    let { user } = useContext( AuthContext);
    if(!user) {
        user = localStorage.getItem('user')
    }
    return (
        <Route
        {...rest}
         render={({ location }) =>
            user ? (
            children
            ) : (
            <Redirect
                to= {{
                    pathname: "/login",
                    state: { from: location }
                     }}
            />
            )

         }
         />
    );
}
