const baseUrl = process.env.REACT_APP_API_URL;

export async function retriveRider(id) {
    const init = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(id)
    }

    // const response = await fetch(`http://localhost:8080/api/signup`, init);
    // if (response.status === 201) {
    //     return Promise.resolve(response => console.log(response));
    // } else if (response.status === 400) {
    //     const messages = await response.json();
    //     return Promise.reject({ status: response.status, messages });
    // }

    return Promise.reject({ status: response.status });
}