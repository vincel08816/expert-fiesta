import React from "react";
import { useAppContext } from "../contexts/AppContext";
import dynamic from "next/dynamic";
const Tour = dynamic(() => import("reactour"), { ssr: false });

// following https://fullstacksoup.blog/2022/06/30/next-js-onboarding-with-reactour-tour-js/
const steps = [
  {
    content: "Welcome to the MenheraGPT! A chatbot app based off of GPT-3",
  },
  {
    selector: '[data-tut="reactour__chat-input"]',
    content:
      "Here to the chatbox! Use it to send messages and have conversations with others.",
  },

  {
    selector: `[data-tut="reactour__conversation"]`,
    content:
      "This is the conversation box. Choose between different conversations and stay organized.",
  },
  {
    selector: `[data-tut="reactour__settings"]`,
    content:
      "Here are the settings you can use to customize. You can choose between the text and the image api",
  },
  {
    selector: `[data-tut="reactour__search"]`,
    content:
      "Quickly find what you're looking for with the search bar. Search your past messages and responses with ease.",
  },
  {
    selector: `[data-tut="reactour__move"]`,
    content:
      "Keep your messages organized by moving them between different conversations. Keep your conversations neat and tidy!",
  },
  {
    selector: `[data-tut="reactour__automate"]`,
    content:
      "You have the flexibility to use either automated or custom chat history to fit your needs. With custom chat history, you have full control over the content.",
  },
  {
    content:
      "🎉 Congratulations, You have finished the tour! Feel free to explore on your own! 🎉",
  },
];

const Tutorial = () => {
  const { isTourOpen, closeTour } = useAppContext();

  return <Tour steps={steps} isOpen={isTourOpen} onRequestClose={closeTour} />;
};

export default Tutorial;
