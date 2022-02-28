const baseUrl = process.env.REACT_APP_API_URL;

export async function findById(rideId) {

    const init = { method: "GET", headers: { "Authorization": `Bearer ${localStorage.getItem("TOKEN")}` } };

    const response = await fetch(`${baseUrl}/${rideId}`, init);
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not fetch ride.");
}

export async function saveRideData(ride) {
    return ride.rideId > 0 ? update(ride) : add(ride);
}

async function update(ride) {
    console.log("ride updated");
}

async function add(ride) {
    console.log("ride added");
}