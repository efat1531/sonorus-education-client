const mongoose = require("mongoose");

// Product Schema - Product Schema is used to define the structure of the document
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
  },
  slug: String,
  price: {
    type: Number,
    required: [true, "A product must have a price"],
    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: "Price must be greater than 0",
    },
  },
  discount: {
    type: Number,
    default: 0,
    validate: [
      {
        // Discount price must be lower than the actual price
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be lower than the price",
      },
      {
        validator: function (val) {
          return val >= 0;
        },
        message: "Discount price should be greater than or equal to 0",
      },
    ],
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
  },
  image: {
    type: String,
    required: [true, "A product must have an image"],
  },
});

productSchema.pre("save", function (next) {
  this.slug = this.name.split(" ").join("-").toLowerCase();
  next();
});

// Product Model - Product Model is used to create an instance of the document
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
