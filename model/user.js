const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

const userSchema = new SCHEMA({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  reservedBike: {
    type: Array,
  },
});

module.exports = new MONGOOSE.model("User", userSchema);
