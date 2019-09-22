import React from "react";
// react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
//TU MET LA VALEUR DANS LA STATE ET TU L4UTULISE
//TODO: Use this to geolocate the user and show him his current position
/* 
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Votre position actuelle est :');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude : ${crd.longitude}`);
  console.log(`La précision est de ${crd.accuracy} mètres.`);
  return 
} 

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
*/
const CustomMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true
      }}
    >
      {/* <Marker position={{ lat: 40.748817, lng: -73.985428 }} /> */}
    </GoogleMap>
  ))
);

function Maps({ ...prop }) {
  return (
    <CustomMap
      apiKey={"AIzaSyBfClQttkQejkzvYQf7I1Ld7nqYww9hsHk"}
      key="AIzaSyBfClQttkQejkzvYQf7I1Ld7nqYww9hsHk"
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfClQttkQejkzvYQf7I1Ld7nqYww9hsHk&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default Maps;
