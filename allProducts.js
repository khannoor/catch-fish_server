const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const { productSchema } = require("./models/allproductsModel");
// const { fishTankModel } = require("./models/fishTankModel"); 
const {productConnection} = require('./db/conn');
require("dotenv").config();

app.use(cors());

//* Create a model from the schema
const AllProductsModel = productConnection.model("aquariumfishes", productSchema);
// const AllFishTankModel = productConnection.model("watertanks", fishTankModel);

//* Check connection status
productConnection.once("open", () => {
  console.log("MongoDB connected to products database");
});

// Set up product routes
const setupProductRoutes = (app) => {
  //* Fetch all products
  app.get("/products/", async (req, res) => {
    try {
      const data = await AllProductsModel.find({});
      console.log("Fetched data:", data);
      res.send(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Fetch a product by ID
  app.get("/products/:_id", async (req, res) => {
    try {
      const data = await AllProductsModel.findById(req.params._id);
      if (!data) {
        return res.status(404).json({ error: "Product not found" });
      }
      console.log("Fetched product:", data);
      return res.status(200).json(data);
    } catch (err) {
      console.error("Error fetching product:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

module.exports = setupProductRoutes;
