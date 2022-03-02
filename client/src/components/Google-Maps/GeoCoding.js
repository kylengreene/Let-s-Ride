import { render } from "@testing-library/react";
import { withRouter } from "react-router-dom";
import { google, map } from "@googlemaps/google-maps-services-js";
import { geocoder } from "@googlemaps/google-maps-services-js";
import marker from "./Marker";
import Geocode from "react-geocode";

export default class GeoCoding {
  constructor() {
  Geocode.setApiKey("AIzaSyDHYOOmwx5qaEfSTYZG_hfDoEx4pAdWJGE");
  Geocode.setLanguage("en");
  Geocode.setRegion("us");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();
  }

  async AddressToCoord(address) {
    const response = await Geocode.fromAddress(address);
    const result = await response.json()
    return response.status === "OK" ? result : Promise.reject(response.status);
}


  async CoordToAddress(lat, long) {
    const response = await Geocode.fromLatLng(lat, long);

        const address = await response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              default:
                console.log("error in processing response");
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(address);
    }
  }
