import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import UserForm from './pages/UserForm';
import Landing from './pages/Landing';
import UserList from './pages/UserList';

const Routes: React.FC = () => { 
  return(
    <BrowserRouter>
        <Route exact path="/" component={Landing}/>
        <Route path="/new" component={UserForm}/>
        <Route path="/list" component={UserList}/>
    </BrowserRouter>
  );
};

export default Routes;