import React from 'react';
import { Button, Container } from '@material-ui/core';
import firebase from 'firebase/app';
import logo from '../logo.png';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const login = () => {
  const provider = googleProvider;
  provider.addScope('profile');
  provider.addScope('email');
  firebase
    .auth()
    .signInWithRedirect(provider)
    .then(() => {
      console.log('Success');
    })
    .catch((err) => {
      console.log(err);
      console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
      console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
      console.log(process.env.REACT_APP_FIREBASE_DATABASE_URL);
    });
};

function Login() {
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <img src={logo} alt="IITH-Dashboard Logo" className="logo-img" />
      <p>Sign in to continue to IITH Dashboard.</p>
      <Button onClick={login} color="primary" variant="contained">
        Sign in with Google
      </Button>
    </Container>
  );
}

export default Login;
