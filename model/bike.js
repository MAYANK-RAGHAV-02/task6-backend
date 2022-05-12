const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

const bikeSchema = new SCHEMA({
  model: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
});

module.exports = new MONGOOSE.model("Bike", bikeSchema);
