import { render } from "@testing-library/react";
import React, { Component } from "react";
import withRouter from '../../utility/withRouter';
import GoogleMapReact from "google-map-react";
import Marker from "./Marker.js";

class MapDisplay extends Component {
  state = {
    defaultCenter: {
      lat: 44.9778,
      lng: -93.265,
    },
    center: {
      lat: 44.9778,
      lng: -93.265,
    },

    zoom: 11,
  };
  centerMap = (lat, lng) => {
    console.log("in centerMap");
    this.setState({
      center: {
        lat: lat,
        lng: lng,
      },
    });
  };

  renderMarkers = () => {
    const markerLocations = [
      { id: 1, lat: 45.07194953498614, lng: -93.28342786031023 },
      { id: 2, lat: 44.98, lng: -93.264 },
      { id: 3, lat: 44.944, lng: -93.093 },
      { id: 4, lat: 44.022, lng: -92.47 },
      { id: 5, lat: 44.841, lng: -93.298 },
      { id: 6, lat: 46.783, lng: -92.107 },
      { id: 7, lat: 45.094, lng: -93.356 },
      { id: 8, lat: 45.011, lng: -93.456 },
      { id: 9, lat: 45.072, lng: -93.456 },
      { id: 10, lat: 44.924, lng: -92.959 },
      { id: 11, lat: 44.804, lng: -93.167 },
      { id: 12, lat: 45.561, lng: -94.162 },
      { id: 13, lat: 44.855, lng: -93.471 },
    ];
    if (markerLocations) {
      return markerLocations.map((marker) => {
        return (
          <Marker
            key={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            name="My Marker"
            color="#fec52d"
            onClick={() => {
              this.centerMap(marker.lat, marker.lng);
            }}
          />
        );
      });
    } else {
      console.log("cannot get marker locations");
    }
  };
  changeMapCenter = (coordinates) => {
    this.setState({
      mapCenter: coordinates,
    });
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDHYOOmwx5qaEfSTYZG_hfDoEx4pAdWJGE" }}
          defaultCenter={this.state.defaultCenter}
          center={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {this.renderMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}
export default withRouter(MapDisplay);
