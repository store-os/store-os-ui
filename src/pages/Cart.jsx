import React from "react";

const Cart = () => {
    return (
        <React.Fragment>
            <p>Cart</p>
            <button className="snipcart-checkout">Click here to checkout</button>
            <span className="snipcart-items-count"></span>
            <span className="snipcart-total-price"></span>
        </React.Fragment>
    );
};

export default Cart;
