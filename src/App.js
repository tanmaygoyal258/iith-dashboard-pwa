import React from 'react';
import firebase from 'firebase';
import dotenv from 'dotenv';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Container,
  CssBaseline,
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Mess from './pages/Mess';
import Cab from './pages/Cab';
import Timetable from './pages/TimeTable';
import Bus from './pages/Bus';
import BottomNav from './components/BottomNav';
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
  // Replace by apicall

  if (!user) {
    return (
      <button type="submit" onClick={login}>
        Sign in with google
      </button>
    );
  }

  return (
    <Router>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Container className="main-container">
          <Switch>
            <Route path='/mess' component={Mess}/>
            <Route path='/bus' component={Bus}/>
            <Route path='/timetable' component={Timetable}/>
            <Route path='/cab' component={Cab}/>
          </Switch>
        </Container>
        <Container className="bottom-nav" disableGutters maxWidth={false}>
          <BottomNav />
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
    </Router>
  );
}

export default App;
