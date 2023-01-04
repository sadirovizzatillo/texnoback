const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    rate:{
        type: Number
    },
    text:{
        type:String,
        required:true
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        require:true
    },
    date: { type: Date, default: Date.now() }
})


const Review = mongoose.model("Review", reviewSchema)

exports.Review = Review