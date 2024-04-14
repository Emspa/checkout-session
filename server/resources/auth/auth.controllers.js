const fs = require("fs").promises
const bcrypt = require("bcrypt")
const fetchUsers = require("../../utils/fetchUsers")
const initStripe = require("../../stripe")

const register = async (req, res) => {

    const { email, password } = req.body

    const stripe = initStripe(); 

    //Kolla så att användaren inte redan finns
    const users = await fetchUsers()
    const userAlreadyExists = users.find(u => u.email === email)

    if (userAlreadyExists) {
        return res.status(400).json("User already exists")
    }

    //Kryptera lösenordet
    const hashedPassword = await bcrypt.hash(password, 10)
    

    try {
        const stripeCustomer = await stripe.customers.create({
            email: email,

        });

        const newUser = {
            email,
            password: hashedPassword,
            stripeCustomerId: stripeCustomer.id, 
        };
        users.push(newUser);
        await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));


        res.status(201).json({ message: "User registered successfully", stripeCustomerId: stripeCustomer.id });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: 'Failed to register user in Stripe.' });
    }
};


const login = async (req, res) => {
    //Kolla så att användaren finns
    const { email, password } = req.body

    //Kolla så att användaren inte redan finns
    const users = await fetchUsers()
    const userExists = users.find(u => u.email === email)

    //Kolla så att lösenordet stämmer och att användaren finns
    if (!userExists || !await bcrypt.compare(password, userExists.password))
     {console.log("Login attempt failed for user:", email);
        return res.status(400).json({ message: "Invalid email or password" })
    }
    console.log("User logged in successfully:", email);

    //Skapa en session
    req.session.user = userExists

    // Skicka tillbaka ett svar
    console.log(userExists)
    console.log({email: userExists.email, stripeCustomerId: userExists.stripeCustomerId})
    res.status(200).json({email: userExists.email, stripeCustomerId: userExists.stripeCustomerId})
}

const logout = (req, res) => {
    req.session = null
    res.status(200).json("Successfully logged out")
    console.log("user is logged out")
}

const authorize = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json("You are not logged in")
    }
    res.status(200).json({email: req.session.user.email, stripeCustomerId: req.session.stripeCustomerId})
}




module.exports = { register, login, logout, authorize}