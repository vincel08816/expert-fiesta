const { Schema, model } = require("mongoose");

module.exports = model(
  "receipt",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
      prompt: { type: Number, required: true, default: 0 },
      completion: { type: Number, required: true, default: 0 },
      total: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
  )
);
