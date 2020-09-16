import React, { Component } from 'react';
import { login } from './../auth';

interface MyProps {
  onLogin: Function
}

export class LoginForm extends Component<{onLogin: Function}, any> {

  state = {
    username: '',
    password: '',
    error: false
  };

  handleChange = (event: { target: { name: string; value: string; }; }) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleClick = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const {username, password} = this.state;
    login(username, password).then((ok) => {
      if (ok) {
        this.props.onLogin();
      } else {
        this.setState({error: true});
      }
    });
  }

  render() {
    const {username, password, error} = this.state;
    return (
      <form className="login-wrapper">
        <h1 className="title">Login</h1>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" name="username" value={username}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" name="password" value={password}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="field">
          <p className="help is-danger">{error && 'Invalid credentials'}</p>
          <div className="control">
            <button className="button is-link" onClick={this.handleClick}>Login</button>
          </div>
        </div>
      </form>
    );
  }
}
