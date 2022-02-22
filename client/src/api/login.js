const baseUrl = process.env.REACT_APP_API_URL;

function hasAuthority(...authorities) {
    for (const authority of authorities) {
        if (this.authorities.includes(authority)) {
            return true;
        }
    }
    return false;
}

function makeCredentials(body) {
    const jwt = body.jwt_token;
    localStorage.setItem("TOKEN", jwt);
    const sections = jwt.split(".");
    const envelope = JSON.parse(atob(sections[1]));
    const credentials = {
        username: envelope.sub,
        authorities: envelope.authorities.split(",")
    };

    credentials.hasAuthority = hasAuthority;
    return credentials;
}

export async function login(credentials) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(credentials)
    };

    const response = await fetch(`${baseUrl}/auth`, init);

    if (response.status === 200) {
        const body = await response.json();
        return Promise.resolve(makeCredentials(body));
    }

    return Promise.reject("bad credentials");
}
