import {call, put, takeEvery} from 'redux-saga/effects';
import {findClubsByPostal} from "../../api/club";


function* handleGetClubs(){
    try{
        const clubs = yield call(findClubsByPostal())
        yield put({type: "CLUB_BY_POSTAL_SUCCESS", clubs: clubs})
    }catch(err){
        
        yield put({type: "CLUB_BY_POSTAL_FAIL", message: err.message})
    }
}

function* watcherClubSaga(){
    yield takeEvery("CLUB_BY_POSTAL_REQUESTED", handleGetClubs);
}

export default watcherClubSaga;