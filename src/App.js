import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Loading from './components/Loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: {},
      loading: false
    }
    this.login = this.login.bind(this);
  }

  login (username, password) {
    const user = {
      username: username,
      password: password,
      loggedIn: false
    };
    this.setState({
      user,
      loading: true
    })
    // send to endpoint to check password and user

    //set loggedIn to true and loading to false


  }

  render() {
    return (
      <div className="App">
        {this.state.loading && 
          <Loading />
        }
        {this.state.user.loggedIn && 
          <Dashboard 
            user={this.state.user} 
          />}
        {!this.state.user.name && 
          <Login 
            login={this.login} 
          />}
      </div>
    );
  }
}

export default App;
