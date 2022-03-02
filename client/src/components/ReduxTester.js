import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useContext } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {rideIncrement, rideDecrement, clubByPostal} from "../actions";

function ReduxTester(){
const tempVar1 = useSelector((state) => state.rideReducer);
const club = useSelector((state) => state.clubs);
const dispatch = useDispatch();
let renderStatus = '';
useEffect(() =>{
    dispatch(clubByPostal(55430));
}, []);

function renderSaga (){
renderStatus = "1";
console.log("renderStatus", renderStatus);
console.log(club.clubs.clubId);
}
    return(
        <div>
<h1>redux tester</h1>
<button onClick ={() =>dispatch(rideIncrement(5))}>UP</button>
<button onClick ={() =>renderSaga()}>UP</button>
{/* <button onClick ={() =>dispatch(clubByPostal(55430))}>GET CLUB</button> */}
<div>{tempVar1}</div>
{club &&
<div>
    <h1>{club.clubs.clubId}</h1>
    <h1>{club.clubs.clubName}</h1>
    <h1>{club.clubs.clubDescription}</h1>
    </div>
        
}
</div>
    )
}

export default withRouter(ReduxTester);