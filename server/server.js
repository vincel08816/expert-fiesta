const express = require("express");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

require("dotenv").config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//
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

// Start the server
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
