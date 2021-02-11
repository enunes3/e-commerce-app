import React, { Component } from "react";
import { connect } from "react-redux";
import util from "../util";
import { addToCart, removeFromCart } from "../actions/cartActions";


class Basket extends Component {
  render() {
    const { cartItems } = this.props;

    {/* either basket is empty || there are "X" items in basket */}
    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          "Basket is empty"
        ) : (
          <div>
            You have {cartItems.length} items in the basket. <hr />
          </div>
        )}
    {/* this checks if cartItems is larger than 0, if so it'll map the cartItems 
    to convert it to a JSX element*/}
        {cartItems.length > 0 && (
          <div>
            <ul style={{ marginLeft: -25 }}>

              {cartItems.map((item) => (
                <li key={item.id}>
                  <b>{item.title}</b>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-danger btn-xs"
                    onClick={(e) =>
                      this.props.removeFromCart(this.props.cartItems, item)
                    }
                  >
                    X
                  </button>
                  <br />
              {/* # of items multiplied with the amount of the price */}
                  {item.count} X {util.formatCurrency(item.price)}
                </li>
              ))}
            </ul>
              
              {/* adding a reduce method of an array (cartItem, current item and it will be returning the total amount) */}
            <b>
              Total:{" "}
              {util.formatCurrency(
                cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}
            </b>
            <button
              onClick={() => alert("Need to implement checkout page.")}
              className="btn btn-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});
export default connect(mapStateToProps, { addToCart, removeFromCart })(Basket);
