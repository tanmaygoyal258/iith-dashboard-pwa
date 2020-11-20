import React from 'react';
import './App.css';
import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

function App() {
  firebase.initializeApp(firebaseConfig);
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  return (
    <button
      type="submit"
      onClick={() => {
        const provider = googleProvider;
        provider.addScope('profile');
        provider.addScope('email');
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            const token = result.credential.accessToken;
            const { user } = result;
            console.log({ user });
            console.log({ token });
          });
      }}
    >
      Sign in with google
    </button>
  );
}

export default App;
