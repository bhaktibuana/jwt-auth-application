import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' component={DashboardPage} exact />
          <Route path='/signup' component={SignUpPage} exact />
          <Route path='/signin' component={SignInPage} exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;