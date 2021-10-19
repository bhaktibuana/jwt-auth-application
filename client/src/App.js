import React from 'react';
import './App.css';
import Form from './Form';
import { BrowserRouter as Switch, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Switch>
      <Route path='/'>
        <p>asdasd</p>
        {/* <Form /> */}
      </Route>
      <Route path='/signup'>
        <SignUpPage />
      </Route>
    </Switch>
  );
}

export default App;