import {call, put, takeEvery} from 'redux-saga/effects';
// import {findClubsByPostal} from "../../api/club";
import fetchClubsByPostal from '../requests/fetchClubs'


function* handleGetClubs(){
    try{
     const dummyZip= 55430
    
        const clubs = yield call(fetchClubsByPostal, dummyZip)
    console.log("logging clubs", clubs._embedded.clubs[0]);
        yield put({type: "CLUB_BY_POSTAL_SUCCESS", clubs: clubs._embedded.clubs[0]})
    }catch(err){
        console.log("logginf rom handler", err);
        yield put({type: "CLUB_BY_POSTAL_FAIL", message: err.message})
    }
}

function* watcherClubSaga(){
    yield takeEvery("CLUB_BY_POSTAL_REQUESTED", handleGetClubs);
}

export default watcherClubSaga;