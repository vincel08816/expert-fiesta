const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const passport = require("passport");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// router.post("/create-checkout-session", async (req, res) => {
//   const { stripeCustomerId } = req.body;
//   try {
//     const session = await stripe.checkout.sessions.create({
//       customer: req.body.stripeCustomerId, // I need to know who the user is?
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price: req.body.priceId, // one time pricing?
//           quantity: req.body.quantity,
//         },
//       ],
//       success_url: "",
//       cancel_url: "",
//     });

//     res.send({ id: session.id });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
