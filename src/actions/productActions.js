import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "./types";

//this will fetch the products from the RESTful API (products/db.json)
export const fetchProducts = () => (dispatch) => {
  fetch("http://localhost:8000/products")
    .then((res) => res.json())
    .catch((err) =>
      fetch("db.json")
        .then((res) => res.json())
        .then((data) => data.products)
    )
    .then((data) => {
      dispatch({ type: FETCH_PRODUCTS, payload: data });
    });
};

{/* filtering products by size */}
{/* if the products is empty, return product itself 
ELSE filter product based on size */}
{/* checking each item to see the available size */}
export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter(
              (x) => x.availableSizes.indexOf(size.toUpperCase()) >= 0
            ),
    },
  });
};

{/* if sort is not empty, we sort by the price */}
{/* using the slice() to make a copy of the array because it's immutable */}
{/* lowest to highest (lines 49-51) */}
{/* highest to lowest (lines 53-56) */}
export const sortProducts = (items, sort) => (dispatch) => {
  const products = items.slice();
  if (sort !== "") {
    products.sort((a, b) =>
      sort === " "
      
        ? a.price > b.price
          ? 1
          : -1
      
        : a.price < b.price
        ? 1
        : -1
    );

    {/*Else, sort by product id */}
  } else {
    products.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: products,
    },
  });
};
