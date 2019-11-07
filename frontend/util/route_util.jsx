import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

export const ProtectedRoute = ({loggedIn, ...props}) => (
   loggedIn ? (<Route {...props} />) : (<Redirect to="/signin"/>)
);