const router = require("express").Router();
const { Configuration, OpenAIApi } = require("openai");
const passport = require("passport");
const Receipt = require("../models/Receipt");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");
const axios = require("axios");
const { scanUrlsForFiles } = require("../utils/utils");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function sendModerationRequest(text) {
  const url = "https://api.openai.com/v1/moderations";
  const data = { input: text };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response?.data?.results;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// returns conversation id
const verifyConversationAndSaveMessage = async (
  conversationId,
  title,
  text,
  response,
  userId
) => {
  try {
    let conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      conversation = new Conversation({ userId });
      conversationId = conversation._id;
    }

    conversation.updatedAt = new Date();
    await conversation.save();

    // save message to mongodb
    const userMessage = new Message({
      userId,
      conversationId,
      isBot: false,
      text,
    });

    // save response to mongodb
    await userMessage.save();

    let newMessageData = {
      userId,
      conversationId,
      responseId: userMessage.id,
      isBot: true,
    };

    if (response?.choices) {
      console.log(response.choices)
      newMessageData.text = response.choices[0].text;
    } else {
      // save image data to google drive?
      console.log(response.data);

      const googleUrls = await scanUrlsForFiles([response.data[0].url]);

      newMessageData.imageUrl = googleUrls[0];
      newMessageData.imageUrls = googleUrls;
    }

    const openAIResponse = await new Message(newMessageData).save();

    // {!} Handle _id when message is created (do this for image)
    return { conversation, userMessageId: userMessage._id, openAIResponse };
  } catch (error) {
    throw new Error(error);
  }
};

// https://oaidalleapiprodscus.blob.core.windows.net/private/org-q7kr2dUOjvmflQuoC8GpLutJ/user-7jFiw4C2fFOE1QY6X8Z85nog/img-2KyyUHSkpcFIa8z4uW2CLKQm.png?st=2023-02-07T05%3A41%3A38Z&se=2023-02-07T07%3A41%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-06T21%3A31%3A00Z&ske=2023-02-07T21%3A31%3A00Z&sks=b&skv=2021-08-06&sig=D6yAmJTEpTKZvDjkhKxu0vCk1Q4mD4e0y4HFDMGRV3A%3D

router.post("/test/uploadMessage", async (req, res) => {
  try {
    const urls = await scanUrlsForFiles(["https://oaidalleapiprodscus.blob.core.windows.net/private/org-q7kr2dUOjvmflQuoC8GpLutJ/user-7jFiw4C2fFOE1QY6X8Z85nog/img-2KyyUHSkpcFIa8z4uW2CLKQm.png?st=2023-02-07T05%3A41%3A38Z&se=2023-02-07T07%3A41%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-06T21%3A31%3A00Z&ske=2023-02-07T21%3A31%3A00Z&sks=b&skv=2021-08-06&sig=D6yAmJTEpTKZvDjkhKxu0vCk1Q4mD4e0y4HFDMGRV3A%3D"])
    res.json({urls});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//testing uploading one message
router.post("/test/updateAllImageMessages", async (req, res) => {
  try {
    let messages = await Message.find({ imageUrl: {$exists: true} });
    let updatedMessages = [];
    for (let message of messages) {
      const imageUrl = message.imageUrl;
      message.imageUrls = [imageUrl];
      message.imageUrl = undefined;
      await message.save();
      updatedMessages.push(message);
    }

    res.json({ messages: updatedMessages });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
})

// @route    POST /api/message/textblank
// @desc     Send a request to the OpenAI API and save the repsonse to mongodb
// @access   Private

router.post(
  "/text",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { payload, text, title, conversationId } = req.body;

      const requestModeration = await sendModerationRequest(text);

      console.log("moderation results", requestModeration);

      console.log(requestModeration);
      if (requestModeration[0].flagged === true) {
        return res.status(400);
      }

      console.log("/api/message", req.body);
      const response = await openai.createCompletion(payload);
      console.log(response.data);

      // const responseModeration = await sendModerationRequest(
      //   response.choices[0].text
      // );

      // if (responseModeration[0].flagged === true) {
      //   return res.status(400);
      // }

      const data = await verifyConversationAndSaveMessage(
        conversationId,
        title,
        text,
        response.data,
        req.user.id
      );

      // save response.data.usage receipt to mongodb
      await new Receipt({
        userId: req.user.id,
        model: payload.model,
        prompt: response.data.usage.prompt_tokens,
        completion: response.data.usage.completion_tokens,
        total: response.data.usage.total_tokens,
      }).save();

      res.json(data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    POST /api/message/image
// @desc     Send a request to the OpenAI API and save the repsonse to mongodb
// @access   Private

router.post(
  "/image",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { payload, text, title, conversationId } = req.body;
      console.log("/api/message", req.body);

      const moderationResults = await sendModerationRequest(text);

      if (moderationResults[0].flagged === true) {
        return res.status(403);
      }

      const response = await openai.createImage(payload);
      console.log(response.data);

      const data = await verifyConversationAndSaveMessage(
        conversationId,
        title,
        text,
        response.data,
        req.user.id
      );

      // save response.data.usage receipt to mongodb
      await new Receipt({
        userId: req.user.id,
        model: "image-dalle-002",
        size: payload.size,
      }).save();

      res.json(data);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    PUT /api/message/:id
// @desc     Edit conversation based on converationId and userId
// @access   Private

router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { keyword } = req.query;

      const userId = mongoose.Types.ObjectId(req.user.id);

      const searchMessages = await Message.find({
        userId,
        text: { $regex: new RegExp(keyword, "i") }, // match keyword
      });

      let userMessages = searchMessages.filter(({ responseId }) => !responseId);

      const extraResponses = await Message.find({
        responseId: { $in: userMessages.map((message) => message._id) },
      });

      const getUniqueMessages = (...params) => {
        let messages = {};

        params.forEach((array) => {
          array.forEach((message) => (messages[message._id] = message));
        });

        return Object.values(messages).sort((a, b) => {
          const dateA = new Date(b.createdAt);
          const dateB = new Date(a.createdAt);
          return dateA - dateB;
        });
      };

      res.send(getUniqueMessages(searchMessages, extraResponses));
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    GET /api/message/:id
// @desc     Get conversation based on converationId and userId
// @access   Private

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const conversationId = req.params.id;
      const userId = req.user.id;

      console.log("/api/message/:id", req.params.id);

      const conversation = await Conversation.findById(conversationId);

      // this covers the case where conversation does not exist OR user does not match
      if (conversation?.userId.toString() !== userId) {
        console.error("Conversation does not exist or user does not match");
        return res.sendStatus(404);
      }

      const messages = await Message.find({ conversationId });

      res.json({ messages });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    PUT /api/move-message/:id
// @desc     Edit conversation based on converationId and userId
// @access   Private

router.put(
  "/move-many",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { messageIds, conversationId } = req.body;

      await Message.updateMany(
        { _id: { $in: messageIds } },
        { $set: { conversationId } }
      );
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    DELETE /api/message/:id
// @desc     Delete one message
// @access   Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("/api/message/:id (delete)", req.params.id);

      await Message.deleteOne({ _id: req.params.id, userId });

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
