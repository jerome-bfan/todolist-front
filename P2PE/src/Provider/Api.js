const apigClientFactory = require("aws-api-gateway-client").default;
export const url = "http://localhost:3001/";
export const optionsUnConnected = {
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
};

/*export const optionsConnected =  new Headers( {
  "Content-Type": "application/json",
  'x-access-token' :localStorage.getItem("token")
})*/

export const optionsConnected =  new Headers( {
  "Content-Type": "application/json",
  'x-access-token' :localStorage.getItem("tooken")
})
