import React from 'react';
import './main.scss';
import {
  Route,
  Switch
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const PrivateRoute = ({ ...rest }) => {
  const user = localStorage.getItem('user')
  if (!user) {
    return <Route exact path="/" component={LoginPage} />
  }
  return <Route {...rest} />
}

const App = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={HomePage} />
    </Switch>
  );
}

export default App;
