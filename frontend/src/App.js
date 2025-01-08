import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import CarPage from './pages/CarPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route path="/users" component={ UserPage } />
        <Route path="/cars" component={ CarPage } />
      </Switch>
    </div>
  );
}

export default App;