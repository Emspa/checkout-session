/** @format */

import React from "react";
import { useCart } from "../context/CartContext"; 

export const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handlePayment = async () => {
    const lineItems = cart.map((item) => ({
      priceId: item.product.default_price.id,
      quantity: item.quantity,
    }));
    const response = await fetch(
      "http://localhost:3002/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({lineItems}),
      }
    );
    const data = await response.json();
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
    
    window.location = data.url;

    clearCart();

  };

  const totalPrice = cart.reduce((total, item) => {
    return (
      total +
      (item.product.default_price.unit_amount_decimal / 100) * item.quantity
    );
  }, 0);

  return (
    <div>
      <h1>My cart</h1>
      {cart.length === 0 ? (
        <p>My cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index}>
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                style={{ width: "100px" }}
              />
              <h3>{item.product.name}</h3>
              <p>Kvantitet: {item.quantity}</p>
              <p>
                Pris:{" "}
                {(item.product.default_price.unit_amount_decimal / 100).toFixed(
                  2
                )}{" "}
                kr
              </p>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
              >
                -
              </button>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
              >
                +
              </button>
              <button onClick={() => removeFromCart(item.product.id)}>
                Delete
              </button>
            </div>
          ))}
          <h2>Totalt Pris: {totalPrice.toFixed(2)} kr</h2>
          <button onClick={handlePayment}>Gå till betalning</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
