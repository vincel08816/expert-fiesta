const { Schema, model } = require("mongoose");

module.exports = model(
  "receipt",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
      prompt: { type: Number, required: true },
      completion: { type: Number, required: true },
      total: { type: Number, required: true },
    },
    { timestamps: true }
  )
);
