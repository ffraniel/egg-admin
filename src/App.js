import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: {},
      loading: false,
      username: '',
      password: ''
    }
    this.login = this.login.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  login (username, password) {
    const user = {
      username: username,
      password: password
    };
    console.log("User", user);
  }

  handleInput (input, field) {
    this.setState({ 
      username: input.target.value
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user.name && <Dashboard user={this.state.user} />}
        {!this.state.user.name && <Login login={this.login} username={this.state.username} password={this.state.password} handleInput={this.handleInput} />}
      </div>
    );
  }
}

export default App;
