const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    parentCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
}) 

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

exports.SubCategory = SubCategory