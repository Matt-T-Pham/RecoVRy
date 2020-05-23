import React from 'react';
import { Redirect } from 'react-router-dom';
import '../css/LoginPage.scss';
import Login from '../components/LoginForm';
import { useStateValue } from '../state';

function LoginPage() {

  const [{authenticated}, ] = useStateValue();

  if(!authenticated) {
    return (
      <div className="Login-page" >
        <Login />
      </div>
    )
  } else {
    return (
      <Redirect to="/" />
    )
  }
}

export default LoginPage;
