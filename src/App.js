import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Loading from './components/Loading';
import LoginError from './components/LoginError';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: {},
      loading: false,
      loginError: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.closeError = this.closeError.bind(this);
  }

  componentDidMount() {
    this.login('jenni', 'eggs');
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
      loading: true,
      loginError: null
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
            user: {},
            loginError: true
          });
          console.log("failed")
          console.log(res)
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
  };

  closeError () {
    this.setState({
      loginError: null
    });
  };

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
        {this.state.loginError && 
          <LoginError closeError={this.closeError}/>
        }
      </div>
    );
  }
}

export default App;
