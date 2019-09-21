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