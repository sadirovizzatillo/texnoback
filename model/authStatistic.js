const mongoose = require("mongoose")

const authStatisticSchema = new mongoose.Schema({
    quantity:{
        type: Number,
        required:true
    },
    currentDate:{
        type:Date
    }
}, { timestamps: true })

const AuthStatistics = mongoose.model("AuthStatisticsSchema", authStatisticSchema)

exports.AuthStatistics = AuthStatistics