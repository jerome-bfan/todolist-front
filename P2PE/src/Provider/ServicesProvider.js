import { optionsUnConnected,optionsConnected, url } from "./Api";

export async function getServices() {
  console.log("je suis ici");

  optionsUnConnected.method = "get";
  optionsUnConnected.body = undefined;
  optionsUnConnected.headers = optionsConnected;

  const rawResponse = await fetch(url + "proposed_services", optionsUnConnected);
  const responseJson = await rawResponse.json();

  console.log("responseJsonJay");
  console.log(responseJson);


  return new Promise((resolve, reject) => {
    if (!rawResponse.ok) {
      reject(responseJson.message);
    }
    console.log("debugyounes");
    console.log(responseJson.message);
    resolve(responseJson);
  });
}
