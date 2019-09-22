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
  const user = {
    description: form.title,
    category: form.addCategory,
    location: form.addLocation,
    prix:  form.addPrix,
    options:  form.options,
    title: form.addTitle,
    state: 1
  };
 

  const rawResponse = await fetch(url + "proposed_services", postHeader(JSON.stringify(form)));
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

export async function getRequestServiceU() {
  const rawResponse = await fetch(url + "users/"+ localStorage.pro_id +"/requested_services/extend", getHeaders());
  const responseJson = await rawResponse.json();

  return new Promise((resolve, reject) => {
    if (!rawResponse.ok) {
      reject(responseJson.message);
    }
    resolve(responseJson);
  });
}
