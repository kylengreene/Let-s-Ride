import GeoCoding from "../components/Google-Maps/GeoCoding";

const baseUrl = process.env.REACT_APP_API_URL, geoCode = new GeoCoding();


export async function findRidesByAddress(address) {
   const {lat, lng} = await geoCode.AddressToCoord(address);
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(`${baseUrl}/rides/search/location?lat=${lat}&lng=${lng}`, init);
    if (response.status === 200) {
        let data =  await response.json();
        console.log(data);
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

    const response = await fetch(`${baseUrl}/rides/${rideId}`, init);

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
