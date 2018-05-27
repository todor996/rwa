import * as actions from './actionType';
export const URL='http://localhost:3052/';

export const buyProducts=(products)=>{
    return {type:actions.BUY_PRODUCTS,
    products};
}

export const buyProductsFail=(error)=>{
    return {type:actions.BUY_PRODUCTS_FAIL,error};
}

export const buyProductsSuccess=()=>{
    return {type:actions.BUY_PRODUCTS_SUCCESS};
}