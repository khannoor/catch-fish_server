const mongoose = require('mongoose');


const fishTankSchema = new mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    id: Number,
    title: String,
    img: String,
    price: Number,
    offprice: Number,
    images: Array,
    stock: Number,
    tank: Boolean,
    isFeatured: Boolean
})

module.exports = {fishTankSchema};