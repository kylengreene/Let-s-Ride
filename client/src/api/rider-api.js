const baseUrl = process.env.REACT_APP_API_URL;

export async function createRider(rider) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(rider)
    }
    const response = await fetch(`${baseUrl}/signup`, init);
    if (response.status === 201) {
        const data = await response.json();
        return Promise.resolve({status: response.status, data});
    } else if (response.status === 400 || response.status === 500) {
        const messages = await response.json();
        return Promise.reject({ status: response.status, messages });
    }

    return Promise.reject({ status: response.status });
}



export async function retrieveRider(username) {
    const init = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    }
    const response = await fetch(`${baseUrl}/riders/search/user?username=${username}`, init)
    if (response.status === 200) {
        return await response.json();

    } else if (response.status === 403) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not retrieve rider.");

}

async function getClubsForRider(data) {
    const init = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    }
    const resp = await fetch(data["_links"].clubs.href, init);
    if (resp.status === 200) {
        const response = await resp.json();
        const clubData = response["_embedded"].clubs;
        return clubData;
    }
}

export async function addAdminRole(username, clubId) {
   const resp = await retrieveRider(username);
   let body = {
    rider: `http://localhost:8080/api/riders/${resp.riderId}`,
    club: `http://localhost:8080/api/clubs/${clubId}`,
    name: "ADMIN",
    pending: false
}

   const init = {
       method: "POST",
       headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
       },
       body: JSON.stringify(body)

   }

    const response = await fetch(`${baseUrl}/roles`, init);
    return response.json();

}
