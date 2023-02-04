const { Schema, model } = require("mongoose");

module.exports = model(
  "user",
  new Schema(
    {
      role: { type: String, default: "unverified", required: true },
      username: { type: String, required: true },
      password: { type: String, required: true },
      picture: { type: String },
      why: { type: String, default: "" },
    },
    { timestamps: true }
  )
);
