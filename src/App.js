import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import dotenv from 'dotenv';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Container, CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mess from './pages/Mess';
import Cab from './pages/Cab';
import Timetable from './pages/TimeTable';
import Bus from './pages/Bus';
import BottomNav from './components/BottomNav';
import NavbarDrawer from './components/NavbarDrawer';

import './App.css';

dotenv.config();

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const googleProvider = new firebase.auth.GoogleAuthProvider();

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#9c5cb4',
      dark: '#002884',
      contrastText: '#666666',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#666666',
    },
  },
});

const login = () => {
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
};

function App() {
  const [user, loading, error] = useAuthState(firebase.auth()); // eslint-disable-line
  const [messData, setMessData] = useState({});
  const [busData, setBusData] = useState({}); // eslint-disable-line

  useEffect(() => {
    fetch(process.env.REACT_APP_MESS_API_ENDPOINT)
      .then((res) => res.json())
      .then((res) => {
        setMessData(res);
      })
      .catch((err) => {
        console.log(err);
        setMessData(null);
      });
  }, [setMessData]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BUS_API_ENDPOINT)
      .then((res) => res.json())
      .then((res) => {
        setBusData(res);
      })
      .catch((err) => {
        console.log(err);
        setBusData(null);
      });
  }, [setBusData]);

  if (!user) {
    return (
      <button type="submit" onClick={login}>
        Sign in with google
        {' '}
      </button>
    );
  }

  return (
    <Router>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <NavbarDrawer />
        <Container className="main-container">
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/mess">
              <Mess Menu={messData} />
            </Route>
            <Route path="/cab">
              <Cab />
            </Route>
            <Route path="/bus">
              <Bus schedule={busData} />
            </Route>
            <Route path="/timetable">
              <Timetable />
            </Route>
          </Switch>
        </Container>
        <Container className="bottom-nav" disableGutters maxWidth={false}>
          <BottomNav />
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
