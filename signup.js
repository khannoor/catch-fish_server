const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'})

app.use(require('./router/auth'));
// mongoose connect
const PORT = process.env.PORT;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATABASE;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// const User = require("./userSchema");


// we limk our router file to make our route easy

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// require('../server/db/conn')

require("../server/router/auth")


// middleware
const middleware = (req,res,next) =>{
  console.log("Hello to my middleware")
  next();
}

app.get("/about",middleware,(req,res)=>{
  res.send('Hello to my about page')
})


// app.listen(PORT,console.log(PORT));