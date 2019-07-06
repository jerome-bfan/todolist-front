const apigClientFactory = require("aws-api-gateway-client").default;
export const url = "http://localhost:3001/";
export const optionsUnConnected = {
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
};

export const getHeaders = () => {
  const options = {};
  options.method = "get";
  options.body = undefined;
  options.headers = {
    "Content-Type": "application/json",
    "x-access-token": localStorage.getItem("token")
  };
  return options;
};

export const postHeader = (body) => {
  const options = {};
  options.method = "post";
  options.body = body;
  options.headers = {
    "Content-Type": "application/json",
    "x-access-token": localStorage.getItem("token")
  };
  return options;
};
