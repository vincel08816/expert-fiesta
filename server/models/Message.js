const { Schema, model } = require("mongoose");

module.exports = model(
  "message",
  new Schema(
    {
      senderId: { required: true, type: String },
      text: { required: true, type: String }, // will send a text to the all users regardless
      openaiOptions: { type: String }, // stringified parameters used before, null if I don't want to query openai
      tags: { type: Array, default: [] }, // optional feature added in later, will be to assist and facilitate searching in the future.
      openaiResponses: { type: Array, default: [] }, // history of responses in case I refresh and prefer a previous output
    },
    { timestamps: true }
  )
);
