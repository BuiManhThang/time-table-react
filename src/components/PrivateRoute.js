import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({props, children}) => {
    const {currentUser} = useAuth();
    return (
        <Route {...props} >
            {currentUser ? children : <Redirect to='sign-in' />}
        </Route>
    )
}

export default PrivateRoute
