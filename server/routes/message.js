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

// @route    POST /api/message/text
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

      // conversationId = req.params.id;
      let conversation = await Conversation.findById(conversationId);

      if (!conversation) {
        conversation = new Conversation({ userId: req.user.id });

        if (title) conversation.title = title;
        conversationId = conversation._id;
      }

      // {!} Will this update the timestamp on the conversation? NO
      conversation.updatedAt = new Date();
      await conversation.save();

      // save message to mongodb
      const userMessage = new Message({
        userId: req.user.id,
        conversationId,
        isBot: false,
        text,
      });

      await userMessage.save();

      // save bot response to mongodb
      await new Message({
        userId: req.user.id,
        conversationId,
        responseId: userMessage.id,
        text: response.data.choices[0].text,
        isBot: true,
      }).save();

      // save response.data.usage receipt to mongodb
      await new Receipt({
        userId: req.user.id,
        model: payload.model,
        prompt: response.data.usage.prompt_tokens,
        completion: response.data.usage.completion_tokens,
        total: response.data.usage.total_tokens,
      }).save();

      res.json({ text: response.data.choices[0].text });
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
      const { payload, text } = req.body;
      console.log("/api/message", req.body);

      const response = await openai.createImage(payload);
      console.log(response.data);

      // save response to mongodb if the conversation exists...
      const userMessage = new Message({
        userId: req.user.id,
        isBot: false,
        text,
      });
      await userMessage.save();

      // save bot response to mongodb
      await new Message({
        userId: req.user.id,
        responseId: userMessage.id,
        text: response.data.choices[0].text,
        isBot: true,
      }).save();

      // save response.data.usage receipt to mongodb
      await new Receipt({
        userId: req.user.id,
        model: "image-dalle-002",
        prompt: response.data.usage.prompt_tokens,
        completion: response.data.usage.completion_tokens,
        total: response.data.usage.total_tokens,
      }).save();

      res.json({ image: response.data.data[0].url });
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

// {!} Make a route to change the converation name

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

module.exports = router;
