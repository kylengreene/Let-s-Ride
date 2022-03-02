import { all } from "redux-saga/effects";
import watcherClubSaga from "./handlers/fetchClubs";

export default function* rootSaga(){
    yield all([watcherClubSaga(), ])
}