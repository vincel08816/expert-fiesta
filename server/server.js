const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const next = require("next");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    const app = express();

    // express stuff
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true, limit: "50mb" }));
    app.use(cors());

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    app.post("/api/chat", async (req, res) => {
      try {
        console.log(req.body);
        console.log("here");

        const response = await openai.createCompletion(req.body.payload);
        // save response to mongodb if the conversation exists...

        res.json({ text: response.data.choices[0].text });
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
    });

    app.post("/api/image", async (req, res) => {
      try {
        console.log(req.body);
        console.log("here");

        const response = await openai.createImage(req.body.payload);
        // save response to mongodb if the conversation exists...

        res.json({ image: response.data.data[0].url });
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
    });

    // nextjs here
    app.get("/", (req, res) => {
      nextApp.render(req, res, "/Home");
    });
    app.get("*", (req, res) => handle(req, res));

    app.listen(5000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:5000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
