import React, { Component } from "react";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import ErrorCard from "./components/ErrorCard";
import Modal from "./components/Modal";
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path='/' component={Navbar} />
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/login' component={ErrorCard} />
          <Route exact path='/error' component={Modal} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/attendance' component={Attendance} />
        </Router>
      </div>
    );
  }
}

export default App;
