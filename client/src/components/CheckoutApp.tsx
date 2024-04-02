/** @format */

export const CheckoutApp = () => {
  const handlePayment = async () => {
    const response = await fetch(
      "http://localhost:3002/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            product: "price_1P14e7GyuykwBSkZE8yTJGvP",
            quantity: 2,
          },
          {
            product: "price_1P14YmGyuykwBSkZKkyXaPCX",
            quantity: 1,
          },
        ]),
      }
    );
    const data = await response.json();
    window.location = data.url;
  };
  return (
    <div>
      <button onClick={handlePayment}>Ge mig pengar</button>
    </div>
  );
};
