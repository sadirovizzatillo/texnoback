const {  SubMiniCategory } = require("../model/subminicategory")



module.exports.all = async (req, res, next) => {
    try{
        const subminicategory = await SubMiniCategory.find()
        
        res.status(200).send({success:true, subminicategory:subminicategory})
    }catch(err){
        res.status(404).send(err)
    }
} 

module.exports.create = async (req, res, next) => {
    try{
        const subminicategory = await new SubMiniCategory({
            name:req.body.name,
            parentSubCategoryId:req.body.parentSubCategoryId
        })
        
        await subminicategory.save()
        
        res.status(200).send({success:true, subminicategory: subminicategory})
    }catch(err){
        res.status(404).send(err)
    }
} 

exports.SubMiniCategory = SubMiniCategory

