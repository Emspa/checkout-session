// /** @format */

// import { useCart } from "../context/CartContext";

// export const CheckoutApp = () => {
//   const { cart } = useCart();
  
//   const handlePayment = async () => {
//     const lineItems = cart.map(item => ({
//       price: item.product.default_price.id,
//       quantity: item.quantity
//     }));
//     const response = await fetch(
//       "http://localhost:3002/api/stripe/create-checkout-session",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(lineItems),
//       }
//     );
//     const data = await response.json();
//     localStorage.setItem("sessionId", JSON.stringify(data.sessionId) ) 
//     window.location = data.url; 
   
// };

//   return (
//     <div>
//       <button onClick={handlePayment}>Ge mig pengar</button>
//     </div>
//   );
// };
