import { render } from "@testing-library/react";
import { withRouter } from "react-router-dom";
import { google, map } from "@googlemaps/google-maps-services-js";
import { geocoder } from "@googlemaps/google-maps-services-js";
import marker from "./Marker";
import Geocode from "react-geocode";

export default class GeoCode {

  constructor() {
  Geocode.setApiKey("AIzaSyDHYOOmwx5qaEfSTYZG_hfDoEx4pAdWJGE");
  Geocode.setLanguage("en");
  Geocode.setRegion("us");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();
  }

  fromLatLng(lat, lng) {
    const closure = () => {
      return Geocode.fromLatLng(lat, lng);
    }
    return closure;
  }

  fromAddress(address) {
    const closure = () => {
      return Geocode.fromAddress(address);
    }
    return closure;
  }

  }
