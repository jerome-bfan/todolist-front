import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

var poolData = {
    UserPoolId: 'eu-west-1_HSNdVjAHO', // Your user pool id here
    ClientId: '3k4d9j6bqdh7e36dbk7bnc0qte', // Your client id here
    region: 'eu-west-1'
};

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: []
        }
    }

    render() {
        const { items } = this.state;

        return (
            <div className="App">
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
            </div>
        );
    }

    doLogin() {
        var authenticationData = {
            Username: this.username.value,
            Password: this.password.value
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);

        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: this.username.value,
            Pool: userPool
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log(result);
                console.log('access token + ' + result.getAccessToken().getJwtToken());
            },

            onFailure: function (err) {
                console.error(err);
            }
        });
    }

    doConfirm(event) {
        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: this.username.value,
            Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(this.code.value, true, function (err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
    }

    doRegister(event) {

        var userPool = new CognitoUserPool(poolData);
        var email = this.email.value;
        var username = this.username.value;
        var phone = this.phone.value;
        var password = this.password.value;
        var preferedusername = 'yaz666'
        var name = 'youyou'

        var attributeList = [];

        var dataEmail = {
            Name: 'email',
            Value: email
        };

        var dataPhoneNumber = {
            Name: 'phone_number',
            Value: phone
        };
        var dataUserNamePref = {
            Name: 'preferred_username',
            value: preferedusername
        };
        var dataName = {
            Name: 'name',
            value: name
        }
        var attributeEmail = new CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
        var attributePreferedUsername = new CognitoUserAttribute(dataUserNamePref)
        var attributeName = new CognitoUserAttribute(dataName)

        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);
        attributeList.push(attributePreferedUsername)
        attributeList.push(attributeName)

        console.log(`Register User ${username} ${phone} ${email}`);
        userPool.signUp(username, password, attributeList, null, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                var cognitoUser = result.user;
                console.log('user registered as ' + cognitoUser.getUsername());
            }
        });
    }

    loadAuthenticatedUser() {
        var that = this;
        console.log("Loading Auth User");

        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    alert(err);
                    return;
                }
                console.log(session);
                console.log('session validity: ' + session.isValid());
                console.log(session.getIdToken().getJwtToken());
                var creds = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-1:800fc845-342e-44d5-b5a2-0e2379086aa5', // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.us-east-1.amazonaws.com/us-east-1_Mr98zHlUu': session.getIdToken().getJwtToken()
                    }
                }, {
                        region: "us-east-1"
                    });

                creds.refresh(function (err, data) {
                    if (err) console.log(err);
                    else {
                        console.log(creds);
                        console.log(creds.accessKeyId);
                        console.log(creds.secretAccessKey);
                        console.log(creds.sessionToken);

                        var apigClient = window.apigClientFactory.newClient({
                            accessKey: creds.accessKeyId,
                            secretKey: creds.secretAccessKey,
                            sessionToken: creds.sessionToken
                        });
                        var params = {};
                        var body = {};
                        var additionalParams = {};

                        apigClient.featureditemsGet(params, body, additionalParams)
                            .then(function (result) {
                                console.log("success");
                                console.log(result.data);
                                that.setState(result.data);
                            }).catch(function (error) {
                                console.log("error");
                                console.error(error);
                            });

                        // var lambda = new AWS.Lambda({
                        //   credentials: creds,
                        //   region: "us-east-1"
                        // });
                        //
                        // var params = {
                        //   FunctionName: 'listFeaturedItems',
                        //   InvocationType: 'RequestResponse',
                        //   Payload: ''
                        // };
                        //
                        // lambda.invoke(params, function(err, result) {
                        //   if (err) console.log(err, err.stack); // an error occurred
                        //   else {
                        //
                        //     var payload = JSON.parse(result.Payload)
                        //     var body = JSON.parse(payload.body)
                        //     console.log(body);           // successful response
                        //     that.setState(body);
                        //     }
                        // });

                    }
                });
                // AWS.config.credentials

                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();

            });
        }
    }

    componentDidMount() {
        this.loadAuthenticatedUser();
        // var that = this;
        // console.log("Component mounted!");

    }

}

export default App;
