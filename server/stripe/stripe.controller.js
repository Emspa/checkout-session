const initStripe = require("../stripe");
const fs = require("fs").promises

const createCheckoutSession = async (req, res) => {

    const { lineItems } = req.body

    const stripe = initStripe();
    if (!stripe) {
        return res.status(500).json({ error: 'Stripe is not initialized.' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            customer: req.body.id,
            line_items: lineItems.map(item => {
                return {
                    price: item.priceId,
                    quantity: item.quantity
                }
        }),
            success_url: "http://localhost:5173/confirmation",
            cancel_url: "http://localhost:5173",
        });

        res.status(200).json({ url: session.url, sessionId: session.id });
    } catch (error) {
        console.error('Stripe API error:', error); 
        res.status(500).json({ error: error.message }); ;
    }
};

const verifySession= async (req, res) => {
    const stripe = initStripe()
    const sessionId = req.body.sessionId

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid") {
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)

        const order = {
            orderNumber: Math.floor(Math.random() * 10000000),
            customerName: session.customer_details.name,
            products: lineItems.data,
            total: session.amount_total,
            date: new Date()
        }

        const orders = JSON.parse(await fs.readFile("./data/orders.json"))
        orders.push(order)
        await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));

        res.status(200).json({ verified: true })
    }

    console.log(session)
}

const getProducts = async (req, res) => {
    const stripe = initStripe();
    try {
        const products = await stripe.products.list({
            active: true,
            expand: ['data.default_price'],
        });

        res.json(products.data);
    } catch (error) {
        console.error("Error fetching products from Stripe:", error);
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
};

const getProductDetails = async (req, res) => {
    const { productId } = req.params;
    const stripe = initStripe();
    if (!stripe) {
        return res.status(500).json({ error: 'Stripe is not initialized.' });
    }
    
    try {
        const product = await stripe.products.retrieve(productId, {
            expand: ['default_price']
        });
        res.json(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Failed to fetch product details.' });
    }
};

module.exports = { createCheckoutSession, getProducts, getProductDetails, verifySession };
