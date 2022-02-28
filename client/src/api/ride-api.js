const baseUrl = process.env.REACT_APP_API_URL;


export async function findRidesByPostal(ridePostal) {
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(`${baseUrl}/rides/search/postal?rideLocation=${ridePostal}`, init);
    if (response.status === 200) {
        return await response.json();
    } else {
        return Promise.reject(response.status);
    }
}

export async function findById(rideId) {

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
    return ride.id > 0 ? update(ride) : add(ride);
}

async function update(ride) {

    const init = { method: "PATCH", headers: {
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(ride)
    };

    const response = await fetch(`${baseUrl}/clubs/${club.rideId}`, init);
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 404) {
        return Promise.reject("Club does not exist");
    }
    return Promise.reject("Ride IDs cannot be changed");
}

async function add(ride) {
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
        return promise.reject("only Admins can delete resources");
    }
    return Promise.reject("Resource does not exist")
}

