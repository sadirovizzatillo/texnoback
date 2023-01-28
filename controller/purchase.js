const { Purchase } = require("../model/purchase")
const { PurchaseStatistics } = require("../model/purchaseStatistic")


module.exports.getPurchases =  async (req, res) => {
    try{        
        const purchased = await PurchaseStatistics.find();
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
        
        var realQuantity = 0
        const quantitys = await req.body.purchased
        await quantitys.forEach(item => {
            realQuantity += item.quantity
        })
        const purchaseStatistic = await PurchaseStatistics.findOneAndUpdate(
            { 
                currentDate: new Date().getDate()
            }, 
            { 
                $inc: 
                { 
                    quantity: realQuantity 
                },
            });
            if(!purchaseStatistic){
                const purchaseStatistics = await new PurchaseStatistics({
                    quantity: realQuantity,
                    currentDate: new Date().getDate()
                })
                await purchaseStatistics.save()
            }
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

      
    module.exports.deletePurchase =  async (req, res) => {
        try{
            const purchased = await PurchaseStatistics.findByIdAndRemove({ _id: req.params.id })
            await res.status(200).send({ success:true, purchased:purchased })
        }catch(err){
            res.status(404).send(err)
        }
    }