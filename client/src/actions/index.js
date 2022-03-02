export const rideIncrement = (number) =>{
    return {
        type:"RIDE_INCREASED",
        payload: number
    };
};
export const rideDecrement = () =>{
    return {
        type:"RIDE_DECREASED",
    };
};

export const clubByPostal = (postal) =>{
    return {
        type:"CLUB_BY_POSTAL_REQUESTED",
        payload: postal
    };
};
