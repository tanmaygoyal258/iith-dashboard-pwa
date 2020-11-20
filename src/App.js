import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="mess-menu" />
      </Switch>
    </HashRouter>
  );
}

export default App;
