import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import dotenv from 'dotenv';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Container, CssBaseline } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mess from './pages/Mess';
// import Cab from './pages/Cab';
import Timetable from './pages/TimeTable';
import Bus from './pages/Bus';
import BottomNav from './components/BottomNav';
import NavbarDrawer from './components/NavbarDrawer';
import Login from './pages/Login';

import makeEventList from './makeEventList';

import { lightTheme, darkTheme } from './Themes';

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

function App() {
  const [user, userLoading, userError] = useAuthState(firebase.auth()); // eslint-disable-line
  const [messData, setMessData] = useState({});
  const [messDataLoading, setMessDataLoading] = useState(true);
  const [messDataError, setMessDataError] = useState(false);
  const [busData, setBusData] = useState({});
  const [busDataLoading, setBusDataLoading] = useState(true);
  const [busDataError, setBusDataError] = useState(false);

  const masterKey = 'masterkey';
  const aimsKey = 'aimskey';
  const customKey = 'customkey';
  const themeKey = 'themeKey';

  const [aimsTimetable, setAimsTimetable] = useState(
    JSON.parse(localStorage.getItem(aimsKey)) || null,
  );
  const [customEvents, setCustomEvents] = useState(
    JSON.parse(localStorage.getItem(customKey)) || [],
  );
  const [eventList, setEventList] = useState(
    JSON.parse(localStorage.getItem(masterKey)) || [],
  );
  const [theme, setTheme] = useState(
    localStorage.getItem(themeKey) === 'light' ? lightTheme : darkTheme,
  );

  const db = firebase.firestore();

  const addCustomEvent = (events) => {
    const newCustomEvents = customEvents.slice();
    newCustomEvents.push(...events);
    const newEventList = makeEventList(aimsTimetable, newCustomEvents);
    localStorage.setItem(masterKey, JSON.stringify(newEventList));
    localStorage.setItem(customKey, JSON.stringify(newCustomEvents));
    setEventList(newEventList);
    setCustomEvents(newCustomEvents);
  };

  const updateTT = () => {
    if (user && !userLoading && !userError) {
      const docRef = db.collection('users').doc(user.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const tt = {};

            tt.identifiedCourses = doc.data().identifiedCourses;
            tt.identifiedSegments = doc.data().identifiedSegments;
            tt.identifiedSlots = doc.data().identifiedSlots;

            if ('identifiedCourseNames' in doc.data()) {
              tt.identifiedCourseNames = doc.data().identifiedCourseNames;
            } else {
              tt.identifiedCourseNames = null;
            }

            if (JSON.stringify(aimsTimetable) !== JSON.stringify(tt)) {
              const newEventList = makeEventList(tt, customEvents);
              localStorage.setItem(masterKey, JSON.stringify(newEventList));
              setEventList(newEventList);
              localStorage.setItem(aimsKey, JSON.stringify(tt));
              setAimsTimetable(tt);
            }
          }
        })
        .catch((err) => {
          console.log('Error getting document:', err);
        });
    }
  };

  const toggleTheme = () => {
    if (theme.palette.type === 'dark') {
      localStorage.setItem(themeKey, 'light');
      setTheme({ ...lightTheme });
    } else {
      localStorage.setItem(themeKey, 'dark');
      setTheme({ ...darkTheme });
    }
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_MESS_API_ENDPOINT)
      .then((res) => res.json())
      .then((res) => {
        setMessData(res);
        setMessDataLoading(false);
      })
      .catch(() => {
        setMessDataError(true);
      });
  }, [setMessData, setMessDataLoading, setMessDataError]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BUS_API_ENDPOINT)
      .then((res) => res.json())
      .then((res) => {
        setBusData(res);
        setBusDataLoading(false);
      })
      .catch(() => {
        setBusDataError(true);
      });
  }, [setBusData, setBusDataLoading, setBusDataError]);

  if (userError) {
    return <h1>An error has ocurred. Please try again later</h1>;
  }

  if (userLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <CircularProgress />
          </div>
        </Container>
      </ThemeProvider>
    );
  }

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login />
      </ThemeProvider>
    );
  }
  if (window.location.pathname === '/iith-dashboard-pwa') window.location.href = '/';
  return (
    <Router basename="/">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavbarDrawer updateTT={updateTT} toggleTheme={toggleTheme} />
        <Container className="main-container" disableGutters>
          <Switch>
            <Route path="/mess">
              <Container>
                <Mess
                  Menu={messData}
                  loading={messDataLoading}
                  error={messDataError}
                />
              </Container>
            </Route>
            {/* <Route path="/cab">
              <Cab />
            </Route> */}
            <Route path="/bus">
              <Container>
                <Bus
                  schedule={busData}
                  loading={busDataLoading}
                  error={busDataError}
                />
              </Container>
            </Route>
            <Route path="/timetable">
              {/* No container here so that timetable component fills the width */}
              <Timetable
                eventList={eventList}
                handleNewCustomEvent={addCustomEvent}
              />
            </Route>
            <Route path="">
              <Container>
                <Home
                  Menu={messData}
                  schedule={busData}
                  events={eventList}
                  loading={busDataLoading || messDataLoading}
                  error={messDataError || busDataError}
                />
              </Container>
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
