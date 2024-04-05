require("dotenv").config()

console.log(`Stripe Key Loaded: ${process.env.STRIPE_KEY ? 'Yes' : 'No'}`);

const express = require("express")
const cookieSession = require("cookie-session")
const cors = require("cors")



const userRouter = require("./resources/users/users.router")
const authRouter = require("./resources/auth/auth.router")

const stripeRouter = require("./stripe/stripe.router")
const app = express()




app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000 * 60 * 60, //1 hour

}))

//Routes
app.use("/api/users", userRouter); 
app.use("/api/auth", authRouter); 
app.use("/api/stripe", stripeRouter);



app.listen(3002, () => console.log("Server is up and running..."))