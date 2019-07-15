import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import Amplify,{API} from 'aws-amplify';
class App extends Component {

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
                //("response is : ", resp);
            })
            .catch (err => //(err))
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
          
        </header>
      </div>
    );
  }
}

export default App;
