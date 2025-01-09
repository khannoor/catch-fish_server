const express = require('express');
const mongoose = require("mongoose");
const app = express()
const cors = require('cors');

require("dotenv").config();

app.use(cors());

const productURI = process.env.DATABASE_2;

// const connUserProductDB = () => {
//   const userProdURI = process.env.DATABASE;
//   return mongoose.createConnection(userProdURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// const connAllProdDB = () => {
//   const allProductURI = process.env.DATABASE_2;
//   return mongoose.createConnection(allProductURI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
// }

// module.exports = {
//   connAllProdDB,
//   connAllProdDB
// }

//* Create a new connection for the products database
const productConnection = mongoose.createConnection(productURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = {productConnection};
