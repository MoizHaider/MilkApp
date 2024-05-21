const { Schema, model, SchemaTypes } = require("mongoose");
const couponSchema = new Schema({
    code: {
      type: String,
      required: true,
      unique: true
    },
    discount: {
      type: Number,
      required: true
    },
    validFrom: {
      type: Date,
      required: true
    },
    validTo: {
      type: Date,
      required: true
    },
    description: String
  });
  
  module.exports = model('Coupon', couponSchema);