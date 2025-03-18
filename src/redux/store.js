import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { productReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
