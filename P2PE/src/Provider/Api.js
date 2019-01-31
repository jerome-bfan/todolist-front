const apigClientFactory = require("aws-api-gateway-client").default;

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
export function getNotes() {
  const additionalParams = {
    headers: { "Access-Control-Allow-Origin": "*" }
  };
  var body = {
    identityid: localStorage.getItem("identityId")
    //This is where you define the body of the request
  };
  return instanceApi()
    .invokeApi(additionalParams, "all", "GET")
    .then(function(result) {
      return result;
    })
    .catch(function(error) {
      return error;
    });
}

export function getAllNotes() {
  const additionalParams = {
    headers: { "Access-Control-Allow-Origin": "*" }
  };

  return instanceApi()
    .invokeApi(additionalParams, "all", "GET")
    .then(function(result) {
      console.log(result);
      return result;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export function postNotes(note) {
  var body = {
    note: note,
    identityid: localStorage.getItem("identityId")
    //This is where you define the body of the request
  };

  return instanceApi()
    .invokeApi(undefined, "getNotes/add", "POST", undefined, body)
    .then(function(result) {
      return result;
    })
    .catch(function(error) {
      return error;
    });
}

export function postUser(id) {
  var body = {
    id: id,
    age: "20",
    profession: "bois",
    birthday: "12/12/1994",
    gender: "homme",
    adress: "paris",
  
  };

  return instanceApi()
    .invokeApi(undefined, "p2pe/users/user", "POST", undefined, body)
    .then(function(result) {
      console.log(result)

      return result;
    })
    .catch(function(error) {
      console.log(error)
      return error;
    });
}

export function postNotesAdmin(note) {
  var body = {
    note: note
    //This is where you define the body of the request
  };
  return instanceApi()
    .invokeApi(undefined, "admin/add", "POST", undefined, body)
    .then(function(result) {
      return result;
    })
    .catch(function(error) {
      return error;
    });
}

export function deleteNotes(noteid) {
  var body = {
    id_note: noteid
    //This is where you define the body of the request
  };

  return instanceApi()
    .invokeApi(undefined, "getNotes/delete", "DELETE", undefined, body)
    .then(function(result) {
      return result;
    })
    .catch(function(error) {
      return error;
    });
}

export function deleteNoteAdmin(noteid) {
  var body = {
    id_note: noteid
    //This is where you define the body of the request
  };

  return instanceApi()
    .invokeApi(undefined, "admin/delete", "DELETE", undefined, body)
    .then(function(result) {
      return result;
    })
    .catch(function(error) {
      return error;
    });
}
