import { put} from 'redux-saga/effects';
import * as actions from "../actions/cart";
import axios from 'axios';

export function* buyProductsSaga(action){
    try{
    console.log(action);
    let orderPrice=action.payload
    .map(s=>s.price)
    .reduce((acc,val)=>acc+val)
    
    
    let order={products:action.payload,price:orderPrice.toFixed(2)}
    yield axios.post(actions.URL+'orders',order);
    yield put (actions.buyProductsSuccess())
    }catch(error){
        yield put(actions.buyProductsFail(error));
    }
}

