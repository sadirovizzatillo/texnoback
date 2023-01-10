const {  Category } = require("../model/category")



module.exports.all = async (req, res, next) => {
    try{
        const category = await Category.find()
        
        res.status(200).send({success:true, categories:category})
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

