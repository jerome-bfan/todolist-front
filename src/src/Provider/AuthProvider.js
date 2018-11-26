import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import awsmobile from '../aws-exports';
import Amplify,{API} from 'aws-amplify';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
const apigClientFactory = require('aws-api-gateway-client').default;


const poolData = {
    UserPoolId: awsmobile.aws_user_pools_id, // Your user pool id here
    ClientId: awsmobile.aws_user_pools_web_client_id, // Your client id here
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
            AWS.config.update({region: "eu-west-1"});

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
                Logins: {
                    'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_T6YnwqOUq': result.getIdToken().getJwtToken()
                }
            });


                    AWS.config. credentials.get(function () {
                        const additionalParams = {

                            queryParams: {
                                org_id: 11111
                            }
                        }
           var test =             apigClientFactory.newClient({
                            accessKey: AWS.config.credentials.accessKeyId,
                            invokeUrl: 'https://utj65gp237.execute-api.eu-west-1.amazonaws.com/Prod/',
                            secretKey: AWS.config.credentials.secretAccessKey,
                            sessionToken: AWS.config.credentials.sessionToken,
                            region: 'eu-west-1',
                            systemClockOffset: 0,
                            retries: 4,
                            retryCondition: (err) => {
                                return err.response.status === 500;
                            }
                                           });
                                           test.invokeApi(null, 'user', 'GET', additionalParams)
                                           .then(function (result) {
                                               console.log(result);
                                           }).catch(function (error) {
                                           if (error.response.status === 404)
                                               console.log('Unable to get the organization. We\'re investigating the issue.');
                                           else if (error.response.status === 505)
                                               console.log('Unable to get the organization. We\'re investigating the issue.');
                                       })    
                    console.log(test);
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
            console.error(err);
        } else {
            var cognitoUser = result.user;
            console.log('user registered as ' + cognitoUser.getUsername());
        }
    });
}