const { Brand } = require("../model/brand");
const { Product } = require("../model/product");
const { Review } = require("../model/review");

module.exports.getAllProduct = async (req, res) => {
    try{
        const products = await Product.find().populate("category");
        const reviews = await Review.find()
        .select("product_id rate user_id");
        const productWithReviews = products.map(product => {
            const review = reviews.find(review => review.product_id.equals(product._id));
            return{
                ...product._doc,
                reviews:review
            }
        })
        await res.status(200).send({ success: true, products: productWithReviews })
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.getAdviceProducts = async (req, res) => {
    try{
        const product = await Product.find({ _id: req.params.id });
        const subcategory = await product[0].subCategory
        const category = await product[0].category
        var adviceProducts = null
        
        if(subcategory){
            const adviceProductss = await Product.find({ subCategory: subcategory });
            adviceProducts = adviceProductss
        }
        else if(category){
            const adviceProductss = await Product.find({ category: category })
            adviceProducts = adviceProductss
        }else{
            const products = await Product.find()
            adviceProducts = products
        }
        await res.status(200).send({ success: true, products: adviceProducts })
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.getAdminProducts = async (req, res) => {
    try{
        const pageNumber = req.query.page ?? 1
        const pageSize = req.query.limit ?? 7
        const allPage = (await Product.find()).length
        const products = await Product.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        
        await res.status(200).send({ success: true, products: products, allPage:allPage })
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.getAdminStatiksProducts = async (req, res, next) => {
    try {
        const products = (await Product.find()).length
        await res.json({ success: true, products: products })
    } catch (err) {
        res.status(404).send(err)
    }
}

module.exports.getSearchedProducts = async (req, res) => {
    try{
        const arrPoruducts = []
        const name = await req.query.name        
        const products = await Product.find();
        await products.forEach(p => {
            if(p.title.toUpperCase().includes(name.toUpperCase())){
                arrPoruducts.push(p)
            }
        })        
        await res.status(200).send({ success: true, products: arrPoruducts })
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.getSingleProduct = async (req, res, next) => {
    try{
        // const pageNumber = req.body.page ?? 1
        // const pageSize = req.body.limit ?? 3
        const products = await Product.find({ _id: req.params.id });
        const brand = await Brand.find({ _id: products[0].brand_id })
        const reviews = await Review.find({ product_id: req.params.id })
        .populate("user_id")
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        if(!products){
            res.status(404).send("Bunday Product topilmadi!");
            return
        }
        
        await res.status(200).send({ success: true, products: products, reviews: reviews, brand:brand })
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.postProduct = async (req, res, next) => {
    try{
        const products = await new Product({
            title:req.body.title,
            text: req.body.text,
            brand_id: req.body.brand_id,
            quantity:req.body.quantity,
            price: req.body.price,
            productImage:req.file.path,
            category:req.body.category,
            subCategory:req.body.subCategory
        })
        
        await products.save()
        await res.status(200).send({ success: true, products: products })
    }catch(err){
        console.log(err)
        res.status(404).send(err)
    }
}

module.exports.updateProduct = async (req, res, next) => {
    try{
        const products = await  Product.findOneAndUpdate({ _id: req.params.id }, {
            img: req.body.img,
            title:req.body.title,
            text: req.body.text,
            brand_id: req.body.brand_id,
            quantity:req.body.quantity,
            price: req.body.price,
            category:req.body.category,
            subCategory:req.body.subCategory
        })  
        await res.status(200).send({ success: true, products: products })
    }catch(err){
        res.status(404).send(err)
    }
}


module.exports.deleteProduct = async (req, res, next) => {
    try{
        const products = await Product.findOneAndDelete({ _id: req.params.id });
        await res.status(200).send({ success: true, products: products })
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.deleteProducts = async (req, res, next) => {
    try{
        const products = await Product.deleteMany();
        await res.status(200).send({ success: true, products: products })
    }catch(err){
        res.status(404).send(err)
    }
}



exports.Product = Product