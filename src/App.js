import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components/pages DECLARATION
import NavBar from "./components/navbar-component";
import Home from "./components/home-component";
import Read from "./components/read-component";
import Create from "./components/create-component";
import Edit from "./components/edit-component";
import Delete from "./components/delete-component";

// pages
import API from "./components/apiList-component";

export const dbConnection = "http://127.0.0.1:8000/api/"
//export const dbConnection = "https://php-rest-api-g.000webhostapp.com/api/";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>

          {/* Navbar path=components/Navbar.js */}
          <NavBar />

          {/* components/pages ROUTES */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/read" component={Read} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/delete/:id" component={Delete} />


            {/* pages */}
            <Route path="/apiList" component={API} />
          </Switch>

        </Router>
      </div>
    )
  }
}