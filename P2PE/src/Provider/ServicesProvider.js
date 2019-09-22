import { optionsUnConnected, getHeaders, url, postHeader } from "./Api";

export async function getServices() {

  const rawResponse = await fetch(url + "proposed_services", getHeaders());
  const responseJson = await rawResponse.json();

  //("responseJsonJay");
  //(responseJson);
  //("responseJsonJay");

  return new Promise((resolve, reject) => {
    if (!rawResponse.ok) {
      reject(responseJson.message);
    }
    resolve(responseJson);
  });
}


export async function postProposedService(form) {
  const service = {
    description: form.description,
    category: form.category,
    location: form.location,
    price:  form.prix,
    option:  form.options,
    name: form.title,
    id_pro: form.id_pro
  };
 

  const rawResponse = await fetch(url + "proposed_services", postHeader(JSON.stringify(service)));
  //("rawResponse");
  //(form.registerSiret);
 
  return new Promise((resolve, reject) => {
    if (!rawResponse.ok) {
      reject(rawResponse);
    }

    resolve(rawResponse);
  });
}
export async function postRequestedService(form) {

 

  const rawResponse = await fetch(url + "requested_services", postHeader(JSON.stringify(form)));
  //("rawResponse");
  //(form.registerSiret);
 
  return new Promise((resolve, reject) => {
    if (!rawResponse.ok) {
      reject(rawResponse);
    }

    resolve(rawResponse);
  });
}