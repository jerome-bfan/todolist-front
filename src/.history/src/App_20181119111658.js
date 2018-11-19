import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import awsmobile from './aws-exports';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

import Amplify,{API} from 'aws-amplify';
class App extends Component {
    componentDidMount() {
        Amplify.configure(awsmobile);
        //this.fetch().then();
    }

    fetch = async () => {
        this.setState(() => {
            return {
                loading: true,
                items: []
            }
        });

        API.get('todolist','/test')
            .then(resp => {
                this.setState({
                    data: resp
                });
                console.log("response is : ", resp);
            })
            .catch (err => console.log(err))
    }


render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React by Jay
      lsls
          </a>
          <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to AWS Twitch</h2>
                </div>
                <p className="App-intro">
                    To get sta0b818d58-232c-4a8b-9a31-6692853f5688rted, edit
                    <code>src/App.js</code>
                    and save to reload.
                </p>
                <input type="text" placeholder="email" ref={(input) => {
                    this.email = input
                }} />
                <input type="text" placeholder="username" ref={(input) => {
                    this.username = input
                }} />
                <input type="text" placeholder="phone" ref={(input) => {
                    this.phone = input
                }} />
                <input type="password" placeholder="password" ref={(input) => {
                    this.password = input
                }} />
                <button onClick={(e) => this.doRegister(e)}>Register</button>
                <button onClick={(e) => this.doLogin(e)}>Login</button>
                <br />
                <input type="text" placeholder="code" ref={(input) => {
                    this.code = input
                }} />
                <button onClick={(e) => this.doConfirm(e)}>Confirm</button>

                {items.map(item => <p>{item.id}</p>)}
        </header>
      </div>
    );
  }
}

export default App;
