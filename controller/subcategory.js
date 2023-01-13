const {  SubCategory } = require("../model/subcategory")



module.exports.all = async (req, res, next) => {
    try{
        const subcategory = await SubCategory.find()
        
        res.status(200).send({success:true, subcategories:subcategory})
    }catch(err){
        res.status(404).send(err)
    }
} 

module.exports.create = async (req, res, next) => {
    try{
        const subcategory = await new SubCategory({
            name:req.body.name,
            parentCategoryId:req.body.parentCategoryId
        })
        
        await subcategory.save()
        
        res.status(200).send({success:true, subcategories: subcategory})
    }catch(err){
        res.status(404).send(err)
    }
} 

exports.SubCategory = SubCategory

