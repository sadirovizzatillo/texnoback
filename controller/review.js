const { Review } = require("../model/review");
const { Product  } = require("../model/product");

module.exports.getAllReviews = async (req, res, next) => {
    try{
        const reviews = await Review.find().populate("user_id");
        await res.status(200).send({ success:true, reviews:reviews})
    }catch(err){
        res.status(404).send(err)
    }
}


module.exports.postReview = async (req, res, next) => {
    try{
        const product = await Product.find({ _id: req.body.product_id})

        if(!product){
            await res.status(404).send("Bunday Product yo'q!");
            return
        }
        const review = await new Review({
            rate:req.body.rate,
            text:req.body.text,
            product_id: req.body.product_id,
            user_id:req.body.user_id
        });
        await review.save()
        await res.status(200).send({ success:true, reviews:review })
    }catch(err){
        res.status(404).send(err)
    }
}

exports.Review = Review