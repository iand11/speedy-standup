const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
  name: String,
  blocker: String,
  ticket: String,
},
  { timestamps: true }
);

module.exports = mongoose.model("App", AppSchema);