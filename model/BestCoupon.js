const mongoose = require('mongoose');

const BestCouponSchema = new mongoose.Schema({
    title: { type: String, required: true },
    affiliate: { type: String, required: true },
});

module.exports = mongoose.model('BestCoupon', BestCouponSchema);
