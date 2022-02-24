const baseUrl = process.env.REACT_APP_API_URL;

export async function findClubs() {
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    }
    const response = await fetch(`${baseUrl}/clubs`, init);
    if (response.status === 200) {
        return await response.json();
    } else {
        return Promise.reject(response.status);
    }
}

export async function findById(clubId) {

    const init = { method: "GET", headers: { "Authorization": `Bearer ${localStorage.getItem("TOKEN")}` } };

    const response = await fetch(`${baseUrl}/${clubId}`, init);
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not fetch club.");
}

export async function saveClubData(club) {
    return club.id > 0 ? update(club) : add(club);
}

async function update(club) {
    console.log("club updated");
}

async function add(club) {
    console.log("club added");
}