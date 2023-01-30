const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { Configuration, OpenAIApi } = require("openai");
const passport = require("passport");
const User = require("../models/User");
const Receipt = require("../models/Receipt");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

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
      if (title) conversation.title = title;
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
      newMessageData.text = response.choices[0].text;
    } else {
      newMessageData.imageUrl = response.data[0].url;
    }

    await new Message(newMessageData).save();

    return conversation;
  } catch (error) {
    throw new Error(error);
  }
};

// @route    POST /api/message/textblank
// @desc     Send a request to the OpenAI API and save the repsonse to mongodb
// @access   Private

router.post(
  "/text",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { payload, text, title, conversationId } = req.body;

      console.log("/api/message", req.body);
      const response = await openai.createCompletion(payload);
      console.log(response.data);

      const conversation = await verifyConversationAndSaveMessage(
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

      res.json({ text: response.data.choices[0].text, conversation });
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

      const response = await openai.createImage(payload);
      console.log(response.data);

      const conversation = await verifyConversationAndSaveMessage(
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

      res.json({ image: response.data.data[0].url, conversation });
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

// @route    GET /api/message/:id
// @desc     Get conversation based on converationId and userId
// @access   Private

router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const conversationId = req.params.id;
      const userId = req.user.id;
      const { title } = req.body;

      console.log("/api/message/edit/:id", { conversationId, title });

      let conversation = await Conversation.findById(conversationId);

      // this covers the case where conversation does not exist OR user does not match
      if (conversation?.userId.toString() !== userId) {
        console.error("Conversation does not exist or user does not match");
        return res.sendStatus(404);
      }

      conversation.title = title;
      conversation = await conversation.save();

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

// @route    GET /api/message/:id
// @desc     Get conversation based on converationId and userId
// @access   Private

module.exports = router;
