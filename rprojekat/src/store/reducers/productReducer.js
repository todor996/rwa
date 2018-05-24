import * as actions from '../actions/actionType';

const initialState = {
    products: [],
    error: null,
    loading: false
}

const fetchProductsStart = (state,action) => {
    return   {...state,error:null,loading:true};
}

const fetchProductsSuccess = (state, action) => {
    return {...state,error:null,loading:false,products:action.products.data};
}

const fetchProductsFail = (state, action) => {
    return  {...state,loading:false,error:action.error};
}

const reducer = (state = initialState,action) => {
    switch (action.type){
        case actions.FETCH_PRODUCTS_START: return fetchProductsStart(state,action);
        case actions.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state,action);
        case actions.FETCH_PRODUCTS_FAIL: return fetchProductsFail(state,action);
        default:
            return state;
    }
}

export default reducer;