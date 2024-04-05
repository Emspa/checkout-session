
const express = require("express")

const { createCheckoutSession, getProducts, getProductDetails, verifySession } = require("./stripe.controller")
const router = express.Router()

router.post("/create-checkout-session", createCheckoutSession)

router.get("/products", getProducts);

router.get("/products/:productId", getProductDetails); 
router.post("/verify-session", verifySession); 


module.exports = router