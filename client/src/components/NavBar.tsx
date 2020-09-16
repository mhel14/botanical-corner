import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface MyProps {
  loggedIn: boolean,
  onLogout: Function
}

export class NavBar extends Component<MyProps> {
  props: { loggedIn: boolean; onLogout: Function; };
  render() {
    const { loggedIn, onLogout } = this.props;
    if (loggedIn) {
      return (
        <nav className="navbar">
          <div className="navbar-end">
            <Link className="navbar-item" to="/fruits">Fruits</Link>
            <Link className="navbar-item" to="/vegetables">Vegetables</Link>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="navbar-item" onClick={() => onLogout()}>Logout</a>
          </div>
        </nav>
      );
    } 
    else {
      return (
        <nav className="navbar" />
      );
    }
  }
}
