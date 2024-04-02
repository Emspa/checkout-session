const initStripe = require("../stripe");

const createCheckoutSession = async (req, res) => {

    const cart = req.body

    const stripe = initStripe();
    if (!stripe) {
        return res.status(500).json({ error: 'Stripe is not initialized.' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: cart.map(item => {
                return {
                    price: item.product,
                    quantity: item.quantity
                }
        }),
            success_url: "http://localhost:5173/confirmation",
            cancel_url: "http://localhost:5173",
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Stripe API error:', error); // This will log the detailed error message from Stripe
        res.status(500).json({ error: error.message }); ;
    }
};

module.exports = { createCheckoutSession };
