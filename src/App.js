import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Home from './components/home';
import Getusers from './components/getusers';
import Adduser from './components/adduser';
import Photos from './components/photos';
import Footer from './components/footer';
import Notfound from './components/notfound';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="navbar">
            <NavLink exact className="navlink" to="/" activeClassName="active">Home</NavLink>
            <NavLink className="navlink" to="/photos" activeClassName="active">Photos</NavLink>
            <NavLink className="navlink" to="/getusers" activeClassName="active">Get Users</NavLink>
            <NavLink className="navlink" to="/adduser" activeClassName="active">Add User</NavLink>
          </div>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/photos" component={() => <Photos title="Photo Album" />} />
            <Route path="/getusers" component={ Getusers } />
            <Route path="/adduser" component={ Adduser } />
            <Route component={ Notfound } />
          </Switch>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App;
