const { Purchase } = require("../model/purchase")


module.exports.getPurchases =  async (req, res) => {
    try{
        const purchased = await Purchase.find();
        await res.status(200).send({ success:true, purchased:purchased })
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.postPurchase =  async (req, res) => {
    try{
        const purchased = await new Purchase({
            user_id:req.body.user_id,
            purchased: req.body.purchased
        });
        await purchased.save()
        await res.status(200).send({ success:true, purchased:purchased })
    }catch(err){
        res.status(404).send(err)
    }
}

module.exports.userSinglePurchase =  async (req, res) => {
    try{
        const purchased = await Purchase.find({ user_id: req.params.id })
        await res.status(200).send({ success:true, purchased:purchased })
    }catch(err){
        res.status(404).send(err)
    }
}