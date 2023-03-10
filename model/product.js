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
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"SubCategory"
    },
    subMiniCategory:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"SubMiniCategory"
    },
    productImage:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
}, { timestamps: true })


const Product = mongoose.model("Product", productSchema);

exports.Product = Product