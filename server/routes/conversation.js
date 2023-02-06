const router = require("express").Router();
const { Configuration, OpenAIApi } = require("openai");
const passport = require("passport");
const Receipt = require("../models/Receipt");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");
const axios = require("axios");

// @route    PUT /api/conversation/title/:id
// @desc     Edit the conversation title
// @access   Private

router.put(
  "/title/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const conversationId = req.params.id;
      const userId = req.user.id;
      const { title } = req.body;

      console.log("put: /api/conversation/title/:id", { conversationId, title });

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

// @route    DELETE /api/conversation/:id
// @desc     Delete conversations and associated messages
// @access   Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const conversationId = req.params.id;
      const userId = req.user.id;

      console.log("/api/message/conversation/:id (delete)", req.params.id);

      const conversation = await Conversation.findById(conversationId);

      // this covers the case where conversation does not exist OR user does not match
      if (conversation?.userId.toString() !== userId) {
        console.error("Conversation does not exist or user does not match");
        return res.sendStatus(404);
      }

      const deletedMessages = await Message.deleteMany({ conversationId });
      await Conversation.deleteOne({ _id: conversationId });

      res.json({ deletedMessages });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);


module.exports = router