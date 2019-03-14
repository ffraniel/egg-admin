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
    this.logout = this.logout.bind(this);
  }

  login (username, password) {
    console.log("we called login on app");
    const user = {
      username: username,
      password: password,
      loggedIn: false
    };
    this.setState({
      user,
      loading: true
    })
    return fetch(`https://wt-68dc6486277619b05f4ee73ad2a8a48e-0.sandbox.auth0-extend.com/egg-store-be/login/${username}/${password}`)
      .then(res => res.json())
      .then(res => {
        console.log("resoponse")
        if (res.success) {
          const newUserState = this.state.user;
          newUserState.loggedIn = true;
          this.setState({
            loading: false,
            user: newUserState
          });
        } 
        else if (res.success === false) {
          this.setState({
            loading: false,
            user: {}
          });
          console.log("failed")
          //add alert to say login failed
        }
      })
      .catch(error => {
        // add error handling
        console.log({Error: error});
      })
  }

  logout (){
    console.log("logout on app called");
    this.setState({
      user: {
        username: '',
        password: '',
        loggedIn: false
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.loading && 
          <Loading />
        }
        {this.state.user.loggedIn && 
          <Dashboard 
            username={this.state.user.username} 
            logout={this.logout}
          />}
        {!this.state.user.loggedIn && 
          <Login 
            login={this.login} 
          />}
      </div>
    );
  }
}

export default App;
