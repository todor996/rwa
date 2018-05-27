import {createStore,combineReducers,applyMiddleware, compose} from 'redux'
import cartReducer from './store/reducers/cartReducer'
import productsReducer from './store/reducers/productReducer'
import createSagaMiddleware from "redux-saga";

import {watchProducts,watchCart} from './store/sagas/index';
function saveToLocalStorage(state){
    try{
        const serializedState=JSON.stringify(state)
        localStorage.setItem('state',serializedState)

    }
    catch(e){
        console.log(e)
    }
}

function loadFromLocalStorage(){
    try{
        const serializedState=localStorage.getItem('state')
        if(serializedState===null) return undefined
        return JSON.parse(serializedState)
    }
    catch(e){
    console.log(e)
    return undefined
    }
}
const sagaMiddleware=createSagaMiddleware();
const rootReducer = combineReducers({
cart: cartReducer,
products: productsReducer
})
const persistedState= loadFromLocalStorage()
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
    rootReducer,
    persistedState,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
)
sagaMiddleware.run(watchProducts);
sagaMiddleware.run(watchCart);
store.subscribe(()=>saveToLocalStorage(store.getState()))


export default store;