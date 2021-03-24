import React, { Component } from "react";
import { connect } from "react-redux";
import util from "../util";
import { addToCart } from "../actions/cartActions";
import { fetchProducts } from "../actions/productActions";

/* */
class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    ////////////////////////////////////////////////////////////////////
    /*using map method to convert the products array to jsx elements */

    const productItems = this.props.products.map((product) => (
      <div className="col-md-4" key={product.id}>
        <div className="thumbnail text-center">
          
          {/* ability to click on the image & it will add item to cart */}
          <a
            href={`#${product.id}`}
            onClick={(e) => this.props.addToCart(this.props.cartItems, product)}
          >

            {/*this will show each specific product w/ image & title */}
            <img src={`products/${product.sku}_2.jpg`} alt={product.title} />
            <p> 
              {product.title}
            </p>
          </a>

          {/*this will show each specific product price and adds the "Add to cart" button - - located in util.js */}
          <b>{util.formatCurrency(product.price)}</b>
          <button
            className="btn btn-primary"
            onClick={(e) => this.props.addToCart(this.props.cartItems, product)}
          >
            Add to cart
          </button>

        </div>
      </div>
    ));

    return (<div className="row">
      {productItems}
      </div>);
  }
}

const mapStateToProps = (state) => ({
  products: state.products.filteredItems,
  cartItems: state.cart.items,
});

export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);
