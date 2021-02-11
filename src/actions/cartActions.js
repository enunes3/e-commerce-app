import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

{/*  */}
export const addToCart = (items, product) => (dispatch) => {
  const cartItems = items.slice();
  let productAlreadyInCart = false;

  {/* for each item inside cartItems & when an item is added, 
  it'll increase the count & increment as well as changing productAlreadyInCart to true */}
  cartItems.forEach((cp) => {
    if (cp.id === product.id) {
      cp.count += 1;
      productAlreadyInCart = true;
    }
  });

{/* if product not in cart, push to cartItems */}
  if (!productAlreadyInCart) {
    cartItems.push({ ...product, count: 1 });
  }
{ /* these lines essentially saving the cartItems in the localStorage
JSON.stringify() method converts a JavaScript object or value to a JSON string */}
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: ADD_TO_CART, payload: { cartItems } });
};

{/* similar to addToCart above */}
{/* slice() creates a copy of items in cart & remove the items that is equal to product
and then it saves to localStorage */}
export const removeFromCart = (items, product) => (dispatch) => {
  const cartItems = items.filter((a) => a.id !== product.id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
};
