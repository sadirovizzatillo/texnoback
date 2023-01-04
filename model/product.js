const mongoose  = require("mongoose")


const productSchema = new mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    brand_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Brand"
    },
    productImage:{
        type:String,
        required:true
    }
})


const Product = mongoose.model("Product", productSchema);

exports.Product = Product