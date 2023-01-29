const router = require("express").Router();
const Message = require("../models/Message");
const { check, validationResult } = require("express-validator");
const { Configuration, OpenAIApi } = require("openai");
const passport = require("passport");
const User = require("../models/User");
const Receipt = require("../models/Receipt");

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
      const { payload, text } = req.body;
      console.log("/api/message", req.body);
      const response = await openai.createCompletion(payload);
      console.log(response);

      // save message to mongodb
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

// @route    POST /api/message/asdf
// @desc     Send a new message
// @access   Private

router.post(
  "/asdf",
  passport.authenticate("jwt", { session: false }),
  check("text", "text is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(400).json({ error: errors });
    }

    try {
      const { senderId, text } = req.body;
      const openaiOptions = JSON.parse(req.body.openaiOptions);

      console.log(senderId);
      if (!(await User.findOne({ _id: senderId }))) {
        console.log("cannot find user");
        return res.sendStatus(401);
      }

      if (!req.body.openaiOptions?.length) {
        await new Message({ senderId, text }).save();
        console.log("message without prompt");

        return res.sendStatus(200);
      }

      const response = await openai.createCompletion(openaiOptions);

      await new Message({
        senderId,
        text,
        openaiOptions: req.body.openaiOptions,
        openaiResponses: [response.data.choices[0].text],
      }).save();

      console.log("message saved");

      res.sendStatus(200);

      res.json({ response: response.data.choices[0].text });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
