const mongoose = require("mongoose");

const subMiniCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    parentSubCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubCategory"
    }
}) 

const SubMiniCategory = mongoose.model("SubMiniCategory", subMiniCategorySchema);

exports.SubMiniCategory = SubMiniCategory