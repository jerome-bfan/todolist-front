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
