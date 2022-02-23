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
