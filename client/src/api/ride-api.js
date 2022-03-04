import GeoCode from "../components/Google-Maps/GeoCode";

const baseUrl = process.env.REACT_APP_API_URL, geoCode = new GeoCode();


export async function findRidesByAddress(address) {
   const geoResponse = await geoCode.fromAddress(address)();
   const {lat, lng} = geoResponse.results[0].geometry.location
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(`${baseUrl}/rides/search/location?lat=${lat}&lng=${lng}`, init);
    if (response.status === 200) {
        const data = await response.json();
        const rides = data._embedded.rides;

        for (let ride of rides) {
            const humanTime = new Date(Date.parse(ride.rideDatetime)).toLocaleString();
            ride.rideDatetime = humanTime;
        }

        return rides;

    } else {
        return Promise.reject(response.status);
    }
}

export async function findRidesWithinWeek() {
    const now = new Date();
    const weekFromNow = addDays(now, 7);
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(`${baseUrl}/rides/search/datetime?now=${now.toISOString()}&weekFromNow=${weekFromNow.toISOString()}&projection=homepage` , init);
    if (response.status === 200) {
        return response.json();
    } else {
        return Promise.reject(response.status);
    }
}

export async function findRideById(rideId) {

    const init = { method: "GET", headers: {
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }};

    const response = await fetch(`${baseUrl}/rides/${rideId}?projection=details`, init);
    if (response.status === 200) {


        const data = await response.json();
        const geoResponse = await geoCode.fromLatLng(data.rideLat, data.rideLng)();
        const addressComp = geoResponse.results[0].address_components;
        data.rideCity = addressComp.filter(obj => obj.types.includes("locality"))[0];
        data.rideState = addressComp.filter(obj => obj.types.includes("administrative_area_level_1"))[0];
        data.rideStreet = addressComp.filter(obj=> obj.types.includes("route"))[0];
        return data;



}

    if (response.status === 200) {
        return response.json();
    } else if (response.status === 403) {
        return Promise.reject(403);
    }

    return Promise.reject("Could not find ride.");
}

export async function saveRideData(ride) {
    return ride.id > 0 ? updateRide(ride) : addRide(ride);
}

async function updateRide(ride) {

    const init = { method: "PATCH", headers: {
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(ride)
    };

    const response = await fetch(`${baseUrl}/clubs/${ride.rideId}`, init);
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 404) {
        return Promise.reject("Club does not exist");
    }
    return Promise.reject("Ride IDs cannot be changed");
}

async function addRide(ride) {
    const init = { method: "POST", headers: {
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(ride)
    };

    const response = await fetch(`${baseUrl}/rides`, init);
    if (response.status === 201) {
        return response.json();
    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Error creating ride.");
}

export async function deleteRide(rideId) {
    const init = { method: "DELETE", headers: {
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
        }
    };

    const response = await fetch(`${baseUrl}/rides/${rideId}`);
    if (response.status === 204) {
        return response.json();
    } else if (response.status === 403) {
        return response.reject("only Admins can delete resources");
    }
    return Promise.reject("Resource does not exist")
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

export async function findAllNotPending(address) {
    const rides = await  findRidesByAddress(address);
    return rides.filter(r => !r.pending);

}
