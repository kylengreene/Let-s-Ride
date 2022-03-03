const baseUrl = process.env.REACT_APP_API_URL

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
         return await response.json();
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
        return await response.json();
    } else {
        return Promise.reject(response.status);
    }

}
