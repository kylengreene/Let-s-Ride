const fetchClubById = (id) =>{
    console.log("id", id);
    const baseUrl = "http://localhost:8080/api";
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    };
        console.log("made it to fetch with init", init);
        return fetch(`${baseUrl}/clubs/search/${id}`, init)
        .then((response) =>response.json())
        .catch((error) =>{
            console.log("oops");
            throw error;
        });
    };
        
    
    export default fetchClubById;