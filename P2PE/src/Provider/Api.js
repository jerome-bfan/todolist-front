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

export function getAllServices() {
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

export function deleteServiceRequested(id) {
  
  return instanceApi()
    .invokeApi(null, "p2pe/requested_services_client/requested_service/" + id, "DELETE")
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
export function getServiceUser() {
  return instanceApi()
    .invokeApi(
      undefined,
      "p2pe/requested_services_client/" + splitIdentity(),
      "GET"
    )
    .then(function(result) {
      console.log(result);
      return result;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export function getCategories() {
  return instanceApi()
    .invokeApi(
      undefined,
      "p2pe/categories",
      "GET"
    )
    .then(function(result) {
      console.log(result);
      return result;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export function getServicePro() {
  return instanceApi()
    .invokeApi(
      undefined,
      "p2pe/requested_services_for_pro/" + splitIdentity(),
      "GET"
    )
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

export function postServicePro(service) {
  var body = {
    title: service.title,
    name: service.name,
    description: service.title,
    category: Number(service.category),
    location: service.location,
    id_pro: splitIdentity(),
    prix: Number(service.prix)

    //This is where you define the body of the request
  };
  var pathParams = {
    //This is where path request params go.
    id_client: 2
  };

  return instanceApi()
    .invokeApi(
      null,
      "p2pe/services_pro/" + splitIdentity(),
      "POST",
      undefined,
      body
    )
    .then(function(result) {
      return result;
    })
    .catch(function(error) {
      return error;
    });
}

export function postServiceUser(id_servicepro, address) {
  var pathParams = {
    //This is where path request params go.
    id_client: splitIdentity()
  };

  var body = {
    id_servicepro: id_servicepro,
    address: address
  };

  return instanceApi()
    .invokeApi(
      pathParams,
      "p2pe/requested_services_client/" + splitIdentity(),
      "POST",
      undefined,
      body
    )
    .then(function(result) {
      console.log(result);

      return result;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export function putPayedService(id) {
  var pathParams = {
    //This is where path request params go.
    id_client: splitIdentity()
  };

  return instanceApi()
    .invokeApi(
      pathParams,
      "p2pe/requested_services_client/requested_service/" + id + "/paid",
      "PUT",
      undefined
    )
    .then(function(result) {
      console.log(result);

      return result;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export function putValidateService(id) {
  return instanceApi()
    .invokeApi(
      undefined,
      "p2pe/requested_services_for_pro/requested-service/" + id + "/validated",
      "PUT",
      undefined
    )
    .then(function(result) {
      console.log(result);

      return result;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export function postUser(id) {
  var body = {
    id: id,
    age: "20",
    profession: "aws secret ",
    birthday: "12/12/1994",
    gender: "homme",
    adress: "aws secret"
  };

  return instanceApi()
    .invokeApi(undefined, "p2pe/users/user", "POST", undefined, body)
    .then(function(result) {
      console.log(result);

      return result;
    })
    .catch(function(error) {
      console.log(error);
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
export function splitIdentity(id = null) {
  let splitString = "";
  if (localStorage.getItem("identityId") != null) {
    splitString = localStorage.getItem("identityId").split(":");
  } else {
    splitString = id.split(":");
  }
  return splitString[1];
}
