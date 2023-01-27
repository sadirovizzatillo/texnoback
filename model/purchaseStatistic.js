const mongoose = require("mongoose")

const purchaseStatisticSchema = new mongoose.Schema({
    quantity:{
        type: Number,
        required:true
    },
    currentDate:{
        type:Date
    }
}, { timestamps: true })

const PurchaseStatistics = mongoose.model("PurchaseStatisticsSchema", purchaseStatisticSchema)

exports.PurchaseStatistics = PurchaseStatistics