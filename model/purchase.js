const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Auth"
    },
    purchased: [
        {
            product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: { type: Number }
        }   
    ]
},{ timestamps:true });

const Purchase = mongoose.model("Purchase", purchaseSchema);

exports.Purchase = Purchase