import { createContext, useContext, useState } from "react";

const FormContext = createContext();

const initialForm = {
  type: "text",
  model: "text-davinci-003",
  size: "512x512",
  n: 1,
  temperature: 1,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  bestOf: 1,
  text: "",
  topText: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. 
    The assistant will wrap code blocks in 3 backticks followed by the language and a new line.
  `,
};

// settings and form for openai

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormContextProvider = ({ children }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const clearText = () =>
    setForm((prev) => {
      return { ...prev, text: "" };
    });

  const value = { form, setForm, handleChange, clearText };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
