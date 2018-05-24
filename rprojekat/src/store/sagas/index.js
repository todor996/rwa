import { all, takeEvery } from "redux-saga/effects";
import * as actionType from "../actions/actionType";
import { fetchProductsSaga } from './products';


export function* watchProducts() {
    yield all ([
        takeEvery(actionType.FETCH_PRODUCTS, fetchProductsSaga)
    ]);
}