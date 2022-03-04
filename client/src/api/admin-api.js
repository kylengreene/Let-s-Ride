import { Contrast } from "@mui/icons-material";
import GeoCode from "../components/Google-Maps/GeoCode";

const baseUrl = process.env.REACT_APP_API_URL, geoCode = new GeoCode();

export async function findPendingMemberships(clubId) {
    const init = {
         method: "GET",
         headers: {
             "Accept": "application/json",
             "Content-Type": "application/json"
         }
     }
     const response = await fetch(`${baseUrl}/roles/search/pending?clubId=${clubId}&projection=admin`, init);
     if (response.status === 200) {
         const data = await response.json();
         const roles = data._embedded.roles;
         return roles;
     } else {
         return Promise.reject(response.status);
     }
 }

export async function findPendingRides(clubId) {
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(`${baseUrl}/rides/search/pending?clubId=${clubId}`, init);
    if (response.status === 200) {
        const data = await response.json();
        const rides = data._embedded.rides;
        for (let ride of rides) {
            const address = await geoCode.fromLatLng(ride.rideLat, ride.rideLng)();
            ride.address = address.results[0].formatted_address;
            const humanTime = new Date(Date.parse(ride.rideDatetime)).toLocaleString();
            ride.rideDatetime = humanTime;
        }
        return rides;
    } else {
        return Promise.reject(response.status);
    }

}

export async function saveAllMembers(listOfMembers) {
    const body = {
        "pending": false
    };
    for (let member of listOfMembers) {

    const init = {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }

    await fetch(`${baseUrl}/roles/${member}`, init);
}
}

export async function saveAllRides(listOfRides) {
    const body = {
        "pending": false
    };

    for (let ride of listOfRides) {

        const init = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        const response = await fetch(`${baseUrl}/rides/${ride}`, init);
            console.log(await response.json())
    }
}

export async function declineSelectedRides(listOfRides) {
    for (let ride of listOfRides) {
        const init = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(`${baseUrl}/rides/${ride}`, init);
        console.log(response);
    }
}

export async function declineSelectedRiders(listOfRiders) {
    for (let rider of listOfRiders) {
        const init = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(`${baseUrl}/roles/${rider}`, init);
        console.log(response);
    }
}
