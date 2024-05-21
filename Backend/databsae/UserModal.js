const { Schema, model, SchemaTypes } = require("mongoose");

const AddressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  house: String,
  additionalInfo: String,
});

const userSchema = new Schema({
  password: String,
  email: String,
  phoneNo: String,
  usedCoupons: [{ type: SchemaTypes.ObjectId, ref: "Coupon" }],
  role: {
    type: String,
    enum: ["user", "staff", "admin", "delivery"],
    default: "user",
  },
  plans: [
    {
      _id: {
        type: SchemaTypes.ObjectId,
        ref: "Plan",
        required: true,
      },
      startDate: Date,
      endDate: Date,
      ttlAmount: Number,
      paused: {
        type: Boolean,
        default: false,
      },
      phoneNo: Number,
      address: AddressSchema,
      pauseStart: Date,
      pauseEnd: Date,
      applied_coupons: [
        {
          type: SchemaTypes.ObjectId,
          ref: "Coupon",
        },
      ],
      pausedProducts: [
        {
          productId: {
            type: SchemaTypes.ObjectId,
            ref: "Product",
            required: true,
          },
          pauseStart: Date,
          pauseEnd: Date,
        },
      ],
    },
  ],
});

module.exports = model("User", userSchema);
