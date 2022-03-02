
const fetchClubsByPostal = (zip) =>{
console.log("zip", zip);
const baseUrl = "http://localhost:8080/api";
const init = {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
    }
};
    console.log("made it to fetch with init", init);
    return fetch(`${baseUrl}/clubs/search/postal?clubPostalCode=${zip}`, init)
    .then((response) =>response.json())
    .catch((error) =>{
        console.log("oops");
        throw error;
    });
};
    

export default fetchClubsByPostal;