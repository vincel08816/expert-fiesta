const { Schema, model } = require("mongoose");

module.exports = model(
  "user",
  new Schema(
    {
      username: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, unique: true, required: true },
      lowercaseEmail: { type: String, unique: true, required: true },
      picture: { type: String },
    },
    { timestamps: true }
  )
);
