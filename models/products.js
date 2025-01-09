const mongoose = require('mongoose');

const userProductSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : String,
    price : Number,
    kg: Number,
    img: String,
    offprice: Number,
    percentoff: String
})

// const productModel = mongoose.model("fish",productSchema);

module.exports = {userProductSchema};