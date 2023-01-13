const {  Category } = require("../model/category")
const { Product } = require("./product")
const { SubCategory } = require("./subcategory")



module.exports.all = async (req, res, next) => {
    try{
        const category = await Category.find()
        
        res.status(200).send({success:true, categories:category})
    }catch(err){
        res.status(404).send(err)
    }
} 

module.exports.getRelatedSubCategories = async (req, res, next) => {
    try{
        const subcategory = await SubCategory.find({ parentCategoryId: req.params.id })
        if(!subcategory){
            await res.status(404).send("Bunday id category topilmadi!")
        }
        res.status(200).send({success:true, subcategories:subcategory})
    }catch(err){
        res.status(404).send(err)
    }
} 

module.exports.categoryProducts = async (req, res, next) => {
    try{
        const products = await Product.find({ category: req.params.id })     
        if(!products){
            await res.status(404).send("Bunday id category topilmadi!")
        }   
        res.status(200).send({success:true, products:products})
    }catch(err){
        res.status(404).send(err)
    }
} 

module.exports.create = async (req, res, next) => {
    try{
        const category = await new Category({
            name:req.body.name
        })
        
        await category.save()
        
        res.status(200).send({success:true, category: category})
    }catch(err){
        res.status(404).send(err)
    }
} 

exports.Category = Category

