import React from 'react'
import { Navigate } from 'react-router-dom'

// Stops people that don't have an account from viewing the website.
function PublicRoute(props) {
    if (localStorage.getItem('token')) {
        return <Navigate to="/" />;
    } else {
        return props.children;
    }

}

export default PublicRoute