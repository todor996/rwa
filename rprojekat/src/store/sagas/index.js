import { all, takeEvery } from "redux-saga/effects";
import * as actionType from "../actions/actionType";
import { fetchProductsSaga } from './products';
import {buyProductsSaga} from './cart';


export function* watchProducts() {
    yield all ([
        takeEvery(actionType.FETCH_PRODUCTS, fetchProductsSaga)
    ]);
}

export function* watchCart(){
    yield all ([
        takeEvery(actionType.BUY_PRODUCTS,buyProductsSaga)
    ]);
}