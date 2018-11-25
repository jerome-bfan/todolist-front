import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'eu-west-1_HSNdVjAHO', // Your user pool id here
    ClientId: '3k4d9j6bqdh7e36dbk7bnc0qte', // Your client id here
    region: 'eu-west-1'
  };

export function authentification (form) {
    console.log(form.password.value);
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
export function doRegister(event) {

    var userPool = new CognitoUserPool(poolData);
    var email = "bob@gmail.com";
    var username = this.username.value;
    var phone = "+3362507104";
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