// require mongoose
const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const ActionSchema = new Schema(
  {
    actionName: {
      type: String,
      required: true,
    },
    actionDate: {
      type: Date,
      required: true,
    },
    includeInAnalytics: {
      type: Number,
      required: false,
    },
  },
  { minimize: false, strict: false },
);

ActionSchema.set("timestamps", {
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});

module.exports = mongoose.model("Action", ActionSchema);
