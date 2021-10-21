import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' component={DashboardPage} exact />
          <Route path='/signup' component={SignUpPage} exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;