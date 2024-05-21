const { Schema, model, SchemaTypes } = require("mongoose");

const planSchema = new mongoose.Schema({
  title: String,
  days: Number,
  daysToSkip: [
    {
      type: String,
      enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    },
  ],
  datesToSkip: [Date],
  products: [
    {
      productId: {
        type: SchemaTypes.ObjectId,
        ref: "Product",
      },
      skipDays: {
        type: Number,
        default: 0,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ]
});

module.exports  = model("Plan", planSchema)
