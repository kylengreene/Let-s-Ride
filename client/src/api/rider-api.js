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
// export async function retriveRider(id) {
//     const init = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(id)
//     }

//     const response = await fetch(`http://localhost:8080/api/signup`, init);
//     if (response.status === 201) {
//         return Promise.resolve(response => console.log(response));
//     } else if (response.status === 400) {
//         const messages = await response.json();
//         return Promise.reject({ status: response.status, messages });
//     }

//     return Promise.reject({ status: response.status });
// }