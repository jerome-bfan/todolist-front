import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
  };

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
    ]

    //(currentLocation.emplacement);

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
            title={'Current location'}
            service_name={'My location'}
            description={'test'} />

          {services.map(item => <Marker
                                onClick={this.onMarkerClick}
                                title={item.title}
                                service_name={item.service_name}
                                nom_pro={item.nom_pro}
                                description={item.description}
                                prix={item.prix}
                                adresse={item.adresse}
                                position={item.emplacement} />
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
