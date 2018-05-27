import * as actions from './actionType';

export const fetchProducts=()=>{
    return {
     type:actions.FETCH_PRODUCTS
    };
}
export const URL='http://localhost:3052/';
export const fetchProductsStart=()=>{
    return {
        type:actions.FETCH_PRODUCTS_START
    };
}

export const fetchProductsSuccess=(products)=>{
    return {
        type:actions.FETCH_PRODUCTS_SUCCESS,
        products
    };
}

export const fetchProductsFail=(error)=>{
    return {
        type:actions.FETCH_PRODUCTS_FAIL,
        error
    };
}
