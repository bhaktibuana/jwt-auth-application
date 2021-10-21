import React from 'react';
import './App.css';
import Form from './Form';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' component={Form} exact />
          <Route path='/signup' component={SignUpPage} exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;