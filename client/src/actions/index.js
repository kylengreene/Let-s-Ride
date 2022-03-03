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

// export const clubById = (id) =>{
//     return {
//         type:"CLUB_BY_ID_REQUESTED",
//         payload: id
//     };
// };

export const clubById = (club) =>{
    return {
        type:"CLUB_SET",
        payload: club
    };
};