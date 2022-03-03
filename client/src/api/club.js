
import GeoCode from "../components/Google-Maps/GeoCode"

const baseUrl = process.env.REACT_APP_API_URL, geoCode = new GeoCode();

export async function findClubsByAddress(address) {
    const geoResponse = await geoCode.fromAddress(address)(); // secondary call for closure
    const {lat, lng} = geoResponse.results[0].geometry.location;
    const init = {
         method: "GET",
         headers: {
             "Accept": "application/json",
             "Content-Type": "application/json"
         }
     }
     const response = await fetch(`${baseUrl}/clubs/search/location?lat=${lat}&lng=${lng}`, init);
     if (response.status === 200) {
         return await response.json();
     } else {
         return Promise.reject(response.status);
     }
 }


export async function findClubById(clubId) {

    const init = { method: "GET", headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }};

    const response = await fetch(`${baseUrl}/clubs/${clubId}`, init);
    if (response.status === 200) {
            return response.json();
    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not fetch club.");
}

export async function saveClubData(club) {
    return club.clubId > 0 ? updateClub(club) : addClub(club);
}

async function updateClub(club) {

    const init = { method: "PATCH", headers: {
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(club)
    };

    const response = await fetch(`${baseUrl}/clubs/${club.clubID}`, init);
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 404) {
        return Promise.reject("Club does not exist");
    }
    return Promise.reject("Club ID's cannot be changed");
}

async function addClub(club) {
    const init = { method: "POST", headers: {
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(club)
    };

    const response = await fetch(`${baseUrl}/clubs`, init);
    if (response.status === 201) {
        return response.json();
    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not fetch club.");
}
