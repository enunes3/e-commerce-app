import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
 
{/* connects Redux Store to Redux dev tools extension in browser*/}
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initState = { cart: { items: cartItems } };
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

{/* createStore is a function that creates the redux store,
takes a few parameters: reducers, initialState, & thunk as an enhancer. 

This then returns a store object & then it passes this object to the react-redux Provider component (in App.js), which is rendered at the top of our component tree. This ensures that any time we connect to Redux in our app via react-redux connect, the store is available to our components 
    The redux-thunk middleware, which allows simple asynchronous use of dispatch.
    A middleware (adds extra functionality to the Redux dispatch function) which logs dispatched actions and the resulting new state.
    An enhancer (add extra functionality to the Redux store) logs the time taken for the reducers to process each action.*/}
const store = createStore(
  rootReducers,
  initState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
