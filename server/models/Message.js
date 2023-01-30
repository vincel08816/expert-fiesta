const { Schema, model } = require("mongoose");

module.exports = model(
  "message",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
      responseId: { type: Schema.Types.ObjectId, ref: "message" },
      conversationId: {
        type: Schema.Types.ObjectId,
        ref: "conversation",
        required: true,
      },
      isBot: { required: true, type: Boolean },
      text: { type: String }, // will send a text to the all users regardless
      imageUrl: { type: String }, // url of the image to be sent to the user
      image: { type: Buffer }, // buffer of the image to be sent to the user
    },
    { timestamps: true }
  )
);
