const { Schema, model } = require("mongoose");

module.exports = model(
  "conversation",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
      title: { type: String, required: true, default: "New Chat" },
    },
    { timestamps: true }
  )
);
