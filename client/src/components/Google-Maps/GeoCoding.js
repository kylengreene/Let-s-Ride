import { render } from "@testing-library/react";
import { withRouter } from "react-router-dom";
import { google, map } from "@googlemaps/google-maps-services-js";
import { geocoder } from "@googlemaps/google-maps-services-js";
import marker from "./Marker";
import Geocode from "react-geocode";

function GeoCoding() {
  Geocode.setApiKey("AIzaSyDHYOOmwx5qaEfSTYZG_hfDoEx4pAdWJGE");
  Geocode.setLanguage("en");
  Geocode.setRegion("us");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();
  function AddressToCoord(address) {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  function CoordToAddress() {
    Geocode.fromLatLng("48.8583701", "2.2922926").then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (
          let i = 0; i < response.results[0].address_components.length; i++
        ) {
          for (
            let j = 0; j < response.results[0].address_components[i].types.length; j++
          ) {
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
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <div>
      <button onClick={() => AddressToCoord("55 Quai Jacques Chirac, 75007 Paris, France")}>Address to Coord</button>
      <button onClick={() => CoordToAddress()}>Coord To Address</button>
    </div>
  );
}

export default withRouter(GeoCoding);
