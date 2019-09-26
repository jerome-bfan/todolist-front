import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import {
  optionsUnConnected,
  url,
  getHeaders,
  postHeader,
  putHeader
} from "../../Provider/Api";

const style = {
  width: '100%',
  height: '100%',
  titlePopup: {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: '700',
    textTransform: 'uppercase'
  }
}

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    services:[],
  };
  componentDidMount() {
    //if (localStorage) user;
    //localStorage.pro_id
   fetch(url + "users/" + localStorage.getItem('pro_id') +  "/requested_services/extend", getHeaders()).then(res => res.json())
   .then(
     (result) => {

       var obj = {
         service:[],
         isLoaded: true
       };
       //("Service in didMount");
       //(result);
       const newServices = result.map(function(service) {

         return {
          geos: service.geos,
          proposed_creation_date: service.proposed_creation_date,
          proposed_description: service.proposed_description,
          proposed_id: service.proposed_id,
          proposed_id_pro: service.proposed_id_pro,
          proposed_location: service.proposed_location,
          proposed_name: service.proposed_name,
          proposed_option: service.proposed_option,
          proposed_price: service.proposed_price,
          proposed_rate: service.proposed_rate,
          proposed_state: service.proposed_rate,
          requested_address: service.requested_address,
          requested_creation_date: service.requested_creation_date,
          requested_expiration_date: service.requested_expiration_date,
          requested_id: service.requested_id,
          requested_id_proposed: service.requested_id_proposed,
          requested_id_user: service.requested_id_user,
          requested_paid: service.requested_paid,
          requested_state: service.requested_state,
         };
       })
       console.log(newServices)

       this.setState({
         services: newServices,
         isLoaded: true
       });

      },
    (error) => {
      this.setState({
        isLoaded: true,
        error: "ERROR"
      });
    }
   )
 }


  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    var currentLocation = [
      {
        title: 'Current location',
        service_name: 'My location',
        description: 'test',
        emplacement: { lat: 48.815619, lng: 2.362983 }
      }
    ]

    return (
        <Map google={this.props.google}
            style={style}
            initialCenter={
              currentLocation[0].emplacement
            }
            zoom={15}
            onClick={this.onMapClicked}>

          <Marker
            onClick={this.onMarkerClick}
            title={'Position actuelle'}
            description={'Vous êtes ici !'} />

          {this.state.services.map(item => <Marker
                                onClick={this.onMarkerClick}
                                title={"Titre:"+item.requested_address}
                                service_name={item.proposed_name}
                                description={"Description"+item.proposed_description}
                                prix={"prix: " + item.proposed_price + " euros"}
                                adresse={"Addresse d'intervention: "+item.requested_address} />
                                //position={{lat: item.geos.lat, lng: item.geos.lng}} />
          )}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div style={{width: '400px', height: '200px', position: 'relative'}}>
                <h1 style={style.titlePopup}>
                  {this.state.selectedPlace.service_name}
                </h1>
                <p>{this.state.selectedPlace.nom_pro}</p>
                <p>{this.state.selectedPlace.description}</p>
                <p>{this.state.selectedPlace.prix}</p>
                <p>{this.state.selectedPlace.adresse}</p>
              </div>
          </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.API_GGMAP)
})(MapContainer)
