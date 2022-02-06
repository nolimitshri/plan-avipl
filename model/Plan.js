const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    courseId: {
        // type: mongoose.Types.ObjectId,
        type: String
        // required: true
    },
    planPrice: {
        type: Number,
        // required: true
    },
    discountedPrice: {
        type: Number,
        // required: true
    },
    noOfPlanPurchased:{
        type: Number
    },
    userId: {
        // type: mongoose.Types.ObjectId
        type: String
    }
}, {timestamps: true});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;