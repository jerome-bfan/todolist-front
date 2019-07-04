const apigClientFactory = require("aws-api-gateway-client").default;
export const url = "http://localhost:3001/";
export const optionsUnConnected = {
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
};

export const optionsConnected =  {headers :{
  "Content-Type": "application/json",
  'x-access-token' :localStorage.getItem("token")
}};

export async function register() {
  const user = {
    email: "jay2s@gmail.com",
    password: "jay",
    gender: "male",
    address: "24 rue de la vie",
    phone_number: "063567676",
    first_name: "jerome",
    last_name: "joujouany",
    role: "user",
    company_name: "la street",
    company_description: "la vraie",
    profession: "askip dev"
  };
  optionsUnConnected.method = "post";
  optionsUnConnected.body = JSON.stringify(user);

  try {
    const rawResponse = await fetch(url + "users", optionsUnConnected);
    const response = await rawResponse;
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }

}

//TODO DELEte this above
export function instanceApi() {
  return apigClientFactory.newClient({
    accessKey: localStorage.getItem("accessKeyId"),
    invokeUrl: "https://utj65gp237.execute-api.eu-west-1.amazonaws.com/Prod/",
    secretKey: localStorage.getItem("secretAccessKey"),
    sessionToken: localStorage.getItem("sessionToken"),
    region: "eu-west-1",
    systemClockOffset: 0,
    retries: 4,
    retryCondition: err => {
      return err.response.status === 500;
    }
  });
}

export function getUser() {
  instanceApi()
    .invokeApi(null, "user", "GET")
    .then(function(result) {
      console.log(result);
    })
    .catch(function(error) {
      if (error.response.status === 404)
        console.log(
          "Unable to get the organization. We're investigating the issue."
        );
      else if (error.response.status === 505)
        console.log(
          "Unable to get the organization. We're investigating the issue."
        );
    });
}

export function splitIdentity(id = null) {
  let splitString = "";
  if (localStorage.getItem("identityId") != null) {
    splitString = localStorage.getItem("identityId").split(":");
  } else {
    splitString = id.split(":");
  }
  return splitString[1];
}
