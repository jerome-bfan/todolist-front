import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";
import awsmobile from "../aws-exports";
import Amplify, { API } from "aws-amplify";
import AWS from "aws-sdk/dist/aws-sdk-react-native";
import { getNotes, getUser, getAllNotes } from "./Api";
var jwtDecode = require("jwt-decode");

const apigClientFactory = require("aws-api-gateway-client").default;

const poolData = {
  UserPoolId: awsmobile.aws_user_pools_id, // Your user pool id here
  ClientId: awsmobile.aws_user_pools_web_client_id, // Your client id here
  region: "eu-west-1"
};

export async function authentification(form) {
  console.log(form);
  var username = form.username;
  var authenticationData = {
    Username: username,
    Password: form.password
  };
  var authenticationDetails = new AuthenticationDetails(authenticationData);

  var userPool = new CognitoUserPool(poolData);
  var userData = {
    Username: username,
    Pool: userPool
  };
  var cognitoUser = new CognitoUser(userData);
  localStorage.removeItem("identityId");
  localStorage.removeItem("accessKeyId");
  localStorage.removeItem("secretAccessKey");
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("roleUser");
  localStorage.removeItem("roleAdmin");
  localStorage.removeItem("email");
  localStorage.clear();

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.log(result);
        AWS.config.update({ region: "eu-west-1" });

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: awsmobile.aws_cognito_identity_pool_id,
          Logins: {
            "cognito-idp.eu-west-1.amazonaws.com/eu-west-1_T6YnwqOUq": result
              .getIdToken()
              .getJwtToken()
          }
        });

        localStorage.setItem("jwtToken", result.getIdToken().getJwtToken());

        var sessionIdInfo = jwtDecode(result.getIdToken().jwtToken);
        var groups = sessionIdInfo["cognito:groups"];
        if (groups) {
          var email = sessionIdInfo["email"];
          if (email != null) {
            localStorage.setItem("email", email);
          }
          groups.map((answer, i) => {
            if (answer == "user") {
              localStorage.setItem("roleUser", true);
            } else if (answer == "admin") {
              localStorage.setItem("roleAdmin", true);
            } else if (answer == "pro") {
              localStorage.setItem("rolePro", true);
            }
          });
        }

        AWS.config.credentials.get(function() {
          localStorage.setItem("identityId", AWS.config.credentials.identityId);
          localStorage.setItem(
            "accessKeyId",
            AWS.config.credentials.accessKeyId
          );
          localStorage.setItem(
            "secretAccessKey",
            AWS.config.credentials.secretAccessKey
          );
          localStorage.setItem(
            "sessionToken",
            AWS.config.credentials.sessionToken
          );
          // getNotes().then(test => {
          //     console.log(test) });
          //window.location.reload();
          AWS.config.admin;
    
          resolve(true);
          return "test";
        });
        return "test";
      },

      onFailure: function(err) {
        // console.error(err);
        reject(err);
        return err;
      }
    });
  });
}

export async function register(form) {
  var userPool = new CognitoUserPool(poolData);
  var email = form.registerEmail;
  var username = form.registerUserName;
  var phone = form.registerPhone;
  var password = form.registerPassword;
  var preferedusername = "yaz666";
  var name = "youyou";

  var attributeList = [];
  var params = {
    GroupName: "pro" /* required */,
    UserPoolId: awsmobile.aws_user_pools_id /* required */,
    Username: "jaydde" /* required */
  };
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  cognitoidentityserviceprovider.adminAddUserToGroup(params, function(
    err,
    data
  ) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
  var dataEmail = {
    Name: "email",
    Value: email
  };

  var dataPhoneNumber = {
    Name: "phone_number",
    Value: phone
  };
  var dataUserNamePref = {
    Name: "preferred_username",
    value: preferedusername
  };
  var dataName = {
    Name: "name",
    value: name
  };
  var attributeEmail = new CognitoUserAttribute(dataEmail);
  var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
  var attributePreferedUsername = new CognitoUserAttribute(dataUserNamePref);
  var attributeName = new CognitoUserAttribute(dataName);

  attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);
  attributeList.push(attributePreferedUsername);
  attributeList.push(attributeName);

  console.log(`Register User ${username} ${phone} ${email}`);
  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, function(
      err,
      result
    ) {
      if (err) {
        resolve(err);
      } else {
        var cognitoUser = result.user;
        console.log("user registered as " + cognitoUser.getUsername());
        resolve(cognitoUser);
      }
    });
  });
}
