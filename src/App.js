import React, { useState } from 'react';
import firebase from 'firebase';
import dotenv from 'dotenv';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  CssBaseline,
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Mess from './pages/Mess';

import './App.css';

dotenv.config();

console.log(process.env);

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

function App() {
  const [user, loading, error] = useAuthState(firebase.auth()); // eslint-disable-line
  const [currentTab, setCurrentTab] = useState('mess');
  // Replace by apicall
  const messData = null;

  const handleTabChange = (_, newTab) => {
    setCurrentTab(newTab);
  };

  const currentComponent = (tabName) => {
    if (tabName === 'mess') {
      return <Mess messData={messData} />;
    }
    // Need to show 404
    return <h1>Error</h1>;
  };

  if (!user) {
    return (
      <button type="submit" onClick={login}>
        Sign in with google
      </button>
    );
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Container className="main-container">
        {currentComponent(currentTab)}
      </Container>
      <Container className="bottom-nav" disableGutters maxWidth={false}>
        <BottomNavigation
          value={currentTab}
          onChange={handleTabChange}
          showLabels
        >
          <BottomNavigationAction
            label="Mess Menu"
            value="mess"
            icon={<RestaurantIcon />}
          />
          <BottomNavigationAction
            label="Timetable"
            value="timetable"
            icon={<CalendarTodayIcon />}
          />
          <BottomNavigationAction
            label="Cab Sharing"
            value="cab-sharing"
            icon={<LocalTaxiIcon />}
          />
          <BottomNavigationAction
            label="Bus Schedule"
            value="bus-schedule"
            icon={<DirectionsBusIcon />}
          />
        </BottomNavigation>
      </Container>
      <button
        type="submit"
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Logout
      </button>
    </ThemeProvider>
  );
}

export default App;
