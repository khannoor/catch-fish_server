const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    id: Number,
    title : String,
    img: String,
    price : Number,
    offprice: Number,
    stock: Number,
    tank: Boolean,
    isFeatured: Boolean,
    type: String,
})

// const allProductModel = mongoose.model("aquariumfishes",productSchema);

module.exports = {productSchema};
