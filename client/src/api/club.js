const baseUrl = process.env.REACT_APP_API_URL;

export async function findClubsByPostal(clubPostalCode) {
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    }
    const response = await fetch(`${baseUrl}/clubs/search/postal?clubPostalCode=${clubPostalCode}`, init);
    if (response.status === 200) {
        return await response.json();
    } else {
        return Promise.reject(response.status);
    }
}

export async function findById(clubId) {

    const init = { method: "GET", headers: {
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }};

    const response = await fetch(`${baseUrl}/${clubId}`, init);
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not fetch club.");
}

export async function saveClubData(club) {
    return club.clubId > 0 ? update(club) : add(club);
}

async function update(club) {

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

async function add(club) {
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
