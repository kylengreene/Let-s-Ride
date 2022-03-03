import {call, put, takeEvery} from 'redux-saga/effects';
// import {findClubsByPostal} from "../../api/club";
import fetchClubById from '../requests/fetchClubs'


function* handleGetClubs(){
    try{
     const dummyId= 4
    
        const clubs = yield call(fetchClubById, dummyId)
    console.log("logging clubs", clubs._embedded.clubs[0]);
        yield put({type: "CLUB_BY_ID_SUCCESS", clubs: clubs._embedded.clubs[0]})
    }catch(err){
        console.log("logginf rom handler", err);
        yield put({type: "CLUB_BY_ID_FAIL", message: err.message})
    }
}

function* watcherClubSaga(){
    yield takeEvery("CLUB_BY_ID_REQUESTED", handleGetClubs);
}

export default watcherClubSaga;