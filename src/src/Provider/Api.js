const apigClientFactory = require('aws-api-gateway-client').default;

export function instanceApi () {
 return  apigClientFactory.newClient({
        accessKey: localStorage.getItem('accessKeyId'),
        invokeUrl: 'https://utj65gp237.execute-api.eu-west-1.amazonaws.com/Prod/',
        secretKey: localStorage.getItem('secretAccessKey'),
        sessionToken: localStorage.getItem('sessionToken'),
        region: 'eu-west-1',
        systemClockOffset: 0,
        retries: 4,
        retryCondition: (err) => {
            return err.response.status === 500;
        }
                       });
                     
}


export function getUser () {

                          instanceApi().invokeApi(null, 'user', 'GET')
                          .then(function (result) {
                              console.log(result);
                          }).catch(function (error) {
                          if (error.response.status === 404)
                              console.log('Unable to get the organization. We\'re investigating the issue.');
                          else if (error.response.status === 505)
                              console.log('Unable to get the organization. We\'re investigating the issue.');
                      })    
   }
   export function getNotes () {
    const additionalParams = {
        queryParams: {
            identityid: "eu-west-1:c72978e3-2d1a-4e61-a913-ba1f5e13ea08"
        }
    }

    return instanceApi().invokeApi(null, 'user', 'GET',additionalParams)
    .then(function (result) {
        return result;
    }).catch(function (error) {
        return error
  
})    
}

export function postNotes (note) {
    var additionalParams = {
        //If there are query parameters or headers that need to be sent with the request you can add them here
        headers: {
            param0: '',
            param1: ''
        },
        queryParams: {
            param0: '',
            param1: ''
        }
    };
    var body = {
        note :note,
        identityid: "eu-west-1:c72978e3-2d1a-4e61-a913-ba1f5e13ea08"
        //This is where you define the body of the request
    };
    const params = {
            note: "react"
        }
    

    return instanceApi().invokeApi(undefined,'getNotes/add', 'POST',undefined,body)
    .then(function (result) {
        return result;
    }).catch(function (error) {
        return error
  
})    
}