const { Brand } = require("../model/brand")
const { Product } = require("../model/product")



module.exports.all = async (req, res, next) => {
    try{
        const brand = await Brand.find()

        res.status(200).send({success:true, brands:brand})
    }catch(err){
        res.status(404).send(err)
    }
} 

module.exports.getSingleBrand = async (req, res, next) => {
    try{
        const pageNumber = req.query.page ?? 1
        const pageSize = req.query.limit ?? 3
        const brand  = await Brand.find({ _id: req.body._id })
        const allPage = await (await Product.find({brand_id: req.body._id})).length

        const filteredProduct = await Product
        .find({ brand_id: req.body._id})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)

        res.status(200).send({ success:true, allPage, filteredProduct, brands:brand })
    }catch(err){
        res.status(404).send(err)
    }
} 

module.exports.create = async (req, res, next) => {
    try{
        console.log(req.body)
        const brand = await new Brand({
            name:req.body.name
        })

        await brand.save()

        res.status(200).send({success:true, brand: brand})
    }catch(err){
        res.status(404).send(err)
    }
} 

exports.Brand = Brand

