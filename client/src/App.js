import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loggedIn, logout } from './auth';
import { LoginForm } from './components/LoginForm';
import { NavBar } from './components/NavBar';
import Fruits from './pages/Fruits';
import Vegetables from './pages/Vegetables';
import Fruit from './pages/Fruit';
import './App.css'
import Vegetable from './pages/Vegetable';

export class App extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     loggedIn: false,
  //   };
  //   this.handleLogin = this.handleLogin.bind(this);
  // }

  state = {
    loggedIn: loggedIn(),
  };

  handleLogin = () => {
    this.setState({loggedIn: true});
    this.router.history.push('/fruits');
  }

  handleLogout = () => {
    logout();
    this.setState({loggedIn: false});
    this.router.history.push('/');
  }

  render() {
    const {loggedIn} = this.state;
    return (
      <Router ref={(router) => this.router = router}>
        <div>
          <NavBar loggedIn={loggedIn} onLogout={this.handleLogout} />
          <section className="section mainSection">
            <div className="container">
              <Switch>
                <Route exact path="/" render={() => <LoginForm onLogin={this.handleLogin} />} />
                <Route path="/fruits" component={Fruits} />
                <Route path="/fruit/:fruitId" component={Fruit} />
                <Route path="/vegetable/:vegetableId" component={Vegetable} />
                <Route path="/vegetables" component={Vegetables} />
                <Route exact path="/login" render={() => <LoginForm onLogin={this.handleLogin} />} />
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}
