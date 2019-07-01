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
  constructor(props, context) {
    super(props, context);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      myLocation: {lat:1, lng: 1},
      currentLocation: [
        {
          title: 'Current location',
          service_name: 'My location',
          description: 'test',
          adresse: '20 Rue Gandon',
          ville: 'Paris'
        }
      ],
      services: [
        {
          title: 'Title as tooltip 1',
          nom_pro: 'Jay Jay',
          service_name: 'jardinage',
          description: 'Nettoyer votre jardin',
          prix: '20€',
          adresse: "160 avenue d'Italie",
          ville: 'Paris'
        },
        {
          title: 'Title as tooltip 2',
          nom_pro: 'YO YO',
          service_name: 'Informatique',
          description: 'Nettoyer votre ordinateur',
          prix: '35€',
          adresse: '17 rue tagore',
          ville: 'Paris'
        }
      ]
    };
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

  async getData(itemAdresse, itemVille) {
    itemAdresse = itemAdresse.replace(" ", "+");
    itemVille = itemVille.replace(" ", "+");

    const response = await fetch('https://api.opencagedata.com/geocode/v1/json?q=' + itemAdresse + ',+' + itemVille + '&key=7e1d894466d346d884499d2bac3fe736');
    const json = await response.json();

    var data= {
      lat: json.results[1].geometry.lat,
      lng: json.results[1].geometry.lng
    };

    return data;
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  async setMyLocation() {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(
          this.getData(this.state.currentLocation[0].adresse, this.state.currentLocation[0].ville)
      ), 3000)
    });

    let result = await promise; // wait till the promise resolves (*)

    this.handleChange('myLocation', result);

    console.log(result);
    console.log(this.state.myLocation);
  }

  render() {
    console.log('Before ');
    this.setMyLocation();
    console.log('After');

    return (
        <Map google={this.props.google}
            style={style}
            initialCenter={
              this.state.myLocation
            }
            zoom={15}
            onClick={this.onMapClicked}>

          <Marker
            onClick={this.onMarkerClick}
            title={'Current location'}
            service_name={'My location'}
            description={'test'} />

          {this.state.services.map((item, i) => <Marker
                                key={i}
                                onClick={this.onMarkerClick}
                                title={item.title}
                                service_name={item.service_name}
                                nom_pro={item.nom_pro}
                                description={item.description}
                                prix={item.prix}
                                adresse={item.adresse}
                                position={{lat:1, lng: 1}} />
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
