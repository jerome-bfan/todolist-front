import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'eu-west-1_HSNdVjAHO', // Your user pool id here
    ClientId: '3k4d9j6bqdh7e36dbk7bnc0qte', // Your client id here
    region: 'eu-west-1'
  };
  
export function authentification () {
    var username = "jay"
    var authenticationData = {
        Username: username,
        Password: "Mind72018"
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username: username,
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
  