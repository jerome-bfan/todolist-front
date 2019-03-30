import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '100%',
  height: '100%'
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
    var points = [
        { lat: 48.814819, lng: 2.373283 },
        { lat: 48.815619, lng: 2.373283 },
        { lat: 48.816419, lng: 2.373283 },
        { lat: 48.817219, lng: 2.373283 },
        { lat: 48.818019, lng: 2.373283 }
    ]

    return (
        <Map google={this.props.google}
            style={style}
            initialCenter={{
              lat: 48.815619,
              lng: 2.362983
            }}
            zoom={15}
            onClick={this.onMapClicked}>
          <Marker
            onClick={this.onMarkerClick}
            title={'Current location'}
            name={'My location'}>

          </Marker>
          <Marker
            onClick={this.onMarkerClick}
            title={'Title as tooltip 1'}
            name={'SOMA'}
            position={points[0]}
            onClick={this.onMarkerClick} />

          <Marker
            onClick={this.onMarkerClick}
            title={'Title as tooltip 2'}
            name={'Dolores park'}
            position={points[1]}
            onClick={this.onMarkerClick} />

          <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCZsidxj-jegaO0xMAFZkpOn7KsCk1a2rg')
})(MapContainer)
