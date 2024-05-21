const { Schema, model, SchemaTypes } = require("mongoose");

const productSchema = new Schema({
    name: String,
    price: Number,
    unit: {
        type: String,
        enum: ["L", "Kg", "piece", "doz"]
    },
    type: {
        type: String
    },
    descritpion: String
  });
  module.exports  = model("Product", productSchema)