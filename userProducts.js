const express = require('express');
const app = express();
const mongoose = require("mongoose");
const { userProductSchema } = require('./models/products');
const cors = require('cors');


app.use(cors());
require('dotenv').config();
const userProduct = process.env.DATABASE_2;

// Create a connection to the user products database
const userProductConn = mongoose.createConnection(userProduct, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Log connection status
userProductConn.once('open', () => {
    console.log("Connected to user products database");
});

const userProductModel = userProductConn.model("fish", userProductSchema);

// Set up user product routes
const setupUserProductRoutes = (app) => {
    // Fetch all user products
    app.get('/userProducts/', async (req, res) => {
        try {
            const data = await userProductModel.find({});
            console.log("Fetched products:", data);
            res.send(data)
        } catch (err) {
            console.error("Error fetching products:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Fetch a user product by ID
    app.get('/userProducts/:_id', async (req, res) => {
        try {
            const data = await userProductModel.findById(req.params._id);
            console.log(data);
            
            if (!data) {
                return res.status(404).json({ error: 'Product not found' });
            }
            console.log("Fetched product:", data);
            return res.status(200).json(data);
        } catch (err) {
            console.error("Error fetching product:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

// Export the setup function
module.exports = { setupUserProductRoutes };
