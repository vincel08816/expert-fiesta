const router = require("express").Router();
const Message = require("../models/Message");
const { check, validationResult } = require("express-validator");
const { Configuration, OpenAIApi } = require("openai");
const passport = require("passport");
const User = require("../models/User");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// @route    POST /api/message/
// @desc     Send a new message
// @access   Private

router.post(
  "/",
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
