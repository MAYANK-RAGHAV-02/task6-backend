const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

const reviewSchema = new SCHEMA({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userId: {
    type: SCHEMA.Types.ObjectId,
    ref: "User",
  },
  bikeId: {
    type: SCHEMA.Types.ObjectId,
    ref: "Restaurant",
  },
});

module.exports = new MONGOOSE.model("Review", reviewSchema);
