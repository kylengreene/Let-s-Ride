export const clubByPostal = (postal) =>{
    return {
        type:"CLUB_FETCHED_BY_POSTAL",
        payload: postal
    };
};