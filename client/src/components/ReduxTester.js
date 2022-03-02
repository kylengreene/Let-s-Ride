import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useContext } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {rideIncrement, rideDecrement, clubByPostal} from "../actions";

function ReduxTester(){
const tempVar1 = useSelector((state) => state.rideReducer);
const tempVar2 = useSelector((state) => state.clubReducer);
const dispatch = useDispatch();
    return(
        <div>
<h1>redux tester</h1>
<button onClick ={() =>dispatch(rideIncrement(5))}>UP</button>
<button onClick ={() =>dispatch(clubByPostal(55430))}>GET CLUB</button>
<div>{tempVar1}</div>
<div>{tempVar2}</div>
        </div>
    )
}

export default withRouter(ReduxTester);