# API documentation

## basepath: http://your_domain/api
---
## /clubs

>### /
-  all `Club`s

>### /{clubId}
- `Club` with specific ID

>### /search/name?clubName={clubName}
- `Club` with specified clubName property

>### /search/postal?clubPostalCode={postalCode}
- list of `Club`s with specified postalCode property


## /rides
>### /
- list of all `Ride`s

>### /{rideId}
- `Ride` with specified rideId

>### /search/postal?rideLocation={postalCode}
- List of `Ride` with specified postalCode

## /auth
- accepts Json formatted Username and Password
- returns a JWT token

## /sign_up
- accepts json formmated firstname, lastname, postal, username, password
- returns ID of rider if successful
- returns error message if error occurs during creation of user
