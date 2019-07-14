import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { getHeaders } from '../../Provider/Api';


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
  constructor(props) {
    super(props)
    this.state = {
      services: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }
  
  componentDidMount() {
    const uri = "http://localhost:9001/users/" + localStorage.getItem('user_id') + "/requested_services/extend"
    fetch(uri, getHeaders())
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            services: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )}

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
    /* var currentLocation = [
      {
        title: 'Current location',
        service_name: 'My location',
        description: 'test',
        emplacement: { lat: 48.815619, lng: 2.362983 }
      }
    ]

    var services = [
      {
        title: 'Title as tooltip 1',
        nom_pro: 'Jay Jay',
        service_name: 'jardinage',
        description: 'Nettoyer votre jardin',
        prix: '20€',
        adresse: 'rue du commerce',
        emplacement: { lat: 48.814819, lng: 2.373283 }
      },
      {
        title: 'Title as tooltip 2',
        nom_pro: 'YO YO',
        service_name: 'Informatique',
        description: 'Nettoyer votre ordinateur',
        prix: '35€',
        adresse: 'rue du maréchal',
        emplacement: { lat: 48.815619, lng: 2.373283 }
      }
    ] */


    return (
        <Map google={this.props.google}
            style={style}
            /* initialCenter={
              currentLocation[0].emplacement
            } */
            zoom={15}
            onClick={this.onMapClicked}>

          <Marker
            onClick={this.onMarkerClick}
            title={'Current location'}
            service_name={'My location'}
            description={'test'} />

          {this.state.services.map(item => <Marker
                                onClick={this.onMarkerClick}
                                title={item.proposed_name}
                                description={item.proposed_description}
                                prix={item.proposed_price}
                                adresse={item.proposed_address}
                                //TODO: change the backend to store the location based on the address using 
                                //TODO:an api to translate address to location
                                position={item.proposed_location} />
          )}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div style={{width: '400px', height: '200px', position: 'relative'}}>
                <h1 style={style.titlePopup}>
                  {this.state.selectedPlace.service_name}
                </h1>
                //TODO: Demander a guillaume ce qu'il faut set ici
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
