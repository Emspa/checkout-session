/** @format */

import React, { useContext } from "react";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css"
export const CartPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const navigateToLogin = () => {
    navigate("/login");  
  };

  const authorize = async () => {
    const response = await fetch("http://localhost:3002/api/auth/authorize", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      handlePayment();
      setUser(data);
    }
  };

  const handlePayment = async () => {
    const lineItems = cart.map((item) => ({
      priceId: item.product.default_price.id,
      quantity: item.quantity,
    }));
    console.log(user);

    const response = await fetch(
      "http://localhost:3002/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          lineItems,
          stripeCustomerId: user?.stripeCustomerId,
        }),
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
<div className="cart-page-container">
  <h1 className="cart-title">My cart</h1>
  {cart.length === 0 ? (
    <p className="empty-cart-message">My cart is empty</p>
  ) : (
    <div>
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img
            src={item.product.images[0]}
            alt={item.product.name}
          />
          <div className="cart-item-details">
            <h3 className="cart-item-detail">{item.product.name}</h3>
            <p className="cart-item-detail">Quantity: {item.quantity}</p>
            <p className="cart-item-detail">
              Price: {(item.product.default_price.unit_amount_decimal / 100).toFixed(2)} kr
            </p>
            <div className="cart-item-actions">
              <button className="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                -
              </button>
              <button className="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                +
              </button>
              <button className="button" onClick={() => removeFromCart(item.product.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <h2 className="total-price">Totalt Price: {totalPrice.toFixed(2)} kr</h2>
      {user ? (
        <button className="checkout-btn" onClick={authorize}>Go to Payment</button>
      ) : (
        <button className="checkout-btn" onClick={navigateToLogin}>Log in to Buy</button>
      )}
    </div>
  )}
</div>

  );
};

export default CartPage;
