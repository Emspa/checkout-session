/** @format */

export const CheckoutApp = () => {
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3002/api/stripe/create-checkout-session", // Corrected URL
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            priceId: "price_1P14e7GyuykwBSkZE8yTJGvP", // Ensure this key matches what the server expects
            quantity: 2,
          },
          {
            priceId: "price_1P14YmGyuykwBSkZKkyXaPCX", // Ensure this key matches what the server expects
            quantity: 1,
          },
        ]),
      }
    );
    const data = await response.json();
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId) ) 
    window.location = data.url; 
   
};

  return (
    <div>
      <button onClick={handlePayment}>Ge mig pengar</button>
    </div>
  );
};
