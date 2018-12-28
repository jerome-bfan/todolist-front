import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import awsmobile from '../aws-exports';
import Amplify,{API} from 'aws-amplify';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import {getNotes, getUser, getAllNotes} from './Api';
var jwtDecode = require('jwt-decode');

const apigClientFactory = require('aws-api-gateway-client').default;


const poolData = {
    UserPoolId: awsmobile.aws_user_pools_id, // Your user pool id here
    ClientId: awsmobile.aws_user_pools_web_client_id, // Your client id here
    region: 'eu-west-1'
  };

export function authentification (form) {
    console.log(form);
    var username = form.username.value;
    var authenticationData = {
        Username: username,
        Password: form.password.value
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new CognitoUser(userData);
    localStorage.removeItem('identityId');
    localStorage.removeItem('accessKeyId');
    localStorage.removeItem('secretAccessKey');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('roleUser');
    localStorage.removeItem('roleAdmin');
    localStorage.removeItem('email');
    localStorage.clear();

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            AWS.config.update({region: "eu-west-1"});

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
                Logins: {
                    'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_T6YnwqOUq': result.getIdToken().getJwtToken()
                }
            });

                localStorage.setItem('jwtToken', result.getIdToken().getJwtToken());

                var sessionIdInfo = jwtDecode(result.getIdToken().jwtToken);
                 var groups = sessionIdInfo['cognito:groups'];
                 if(groups) {
                 var email = sessionIdInfo['email'];
                if(email != null) {
                    localStorage.setItem('email', email);
                }
                 groups.map((answer, i) => {if(answer == "user")
                {
                    localStorage.setItem('roleUser', true);

                } else if (answer == "admin")
            {
                localStorage.setItem('roleAdmin', true);

            }
        
        })}

                    AWS.config. credentials.get(function () {
                        localStorage.setItem('identityId', AWS.config.credentials.identityId);
                        localStorage.setItem('accessKeyId', AWS.config.credentials.accessKeyId);
                        localStorage.setItem('secretAccessKey', AWS.config.credentials.secretAccessKey);
                        localStorage.setItem('sessionToken', AWS.config.credentials.sessionToken);
                getAllNotes().then(test => {
                    console.log(test) }); 
               // window.location.reload();
                });            
            },

        onFailure: function (err) {
            console.error(err);
        }
    });
}

export function register(form) {

    var userPool = new CognitoUserPool(poolData);
    var email =  form.registerEmail.value;
    var username = form.registerUserName.value;
    var phone = form.registerPhone.value;
    console.log(phone);
    var password = form.registerPassword.value;
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
            return "easy"
        } else {
            var cognitoUser = result.user;
            console.log('user registered as ' + cognitoUser.getUsername());
            return "true";
        }

    });
}