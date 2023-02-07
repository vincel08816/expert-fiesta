import { TextareaAutosize } from "@mui/base";
import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";

const presets = [
  {
    title: "None",
    text: "",
  },
  {
    title: "default",
    text: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.",
  },
  {
    title: "Code",
    text: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. 
    The assistant will wrap code blocks in 3 backticks followed by the language and a new line.
  `,
  },
];

const PromptHeaderPreset = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleChange } = useAppContext();
  const openSelectMenu = Boolean(anchorEl);

  return (
    <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
      <Button
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          borderRadius: "8px",
          maxHeight: "10px",
          p: 0,
          fontSize: 10,
          mb: -23,
          mr: -2,
        }}
      >
        Preset
      </Button>
      <Menu
        sx={{ borderRadius: "8px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={openSelectMenu}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {presets.map(({ title, text }, index) => (
          <MenuItem
            key={title + index}
            sx={{ fontSize: "12px" }}
            name="topText"
            value={text}
            onClick={(e) => {
              handleChange({
                target: { name: "topText", value: text },
                preventDefault: () => {},
              });
              setAnchorEl(null);
            }}
          >
            {title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const FormComponent = ({
  title,
  state,
  helperText,
  step = 0.1,
  min = 0,
  max = 1,
  defaultValue = 1,
  handleChange,
  name,
}) => (
  <FormControl sx={{ mt: 2 }}>
    <Tooltip title={helperText} placement="top">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="body2">{state}</Typography>
      </Box>
    </Tooltip>

    <Slider
      sx={{ mt: 1, mb: 1 }}
      size="small"
      defaultValue={defaultValue}
      valueLabelDisplay="auto"
      onChange={handleChange}
      step={step}
      min={min}
      max={max}
      name={name}
    />
  </FormControl>
);

const Settings = (display) => {
  const { form, handleChange } = useAppContext();

  const {
    model,
    topP,
    temperature,
    frequencyPenalty,
    presencePenalty,
    bestOf,
    size,
  } = form;

  return (
    <Box
      key={"API Settings"}
      sx={{
        flex: 1,
        display,
        flexDirection: "column",
        p: 3,
        pt: 1,
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <FormControl sx={{ mb: 2 }}>
        <InputLabel>Model</InputLabel>
        <Select
          sx={{ mb: 1 }}
          value={model}
          name="model"
          onChange={handleChange}
        >
          {[
            "text-davinci-003",
            "text-davinci-002",
            "text-davinci-001",
            "text-curie-001",
            "code-cushman-001",
            "code-davinci-002",
            "image-dalle-002",
          ].map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <PromptHeaderPreset />
      <Typography variant="body2" sx={{ mb: 1 }}>
        Prompt Header
      </Typography>

      <TextareaAutosize
        placeholder="This header allows you to write a short description on top of the prompt"
        value={form.topText}
        name="topText"
        onChange={handleChange}
        style={{
          resize: "none",
          width: "auto",
          padding: "12px",
          minHeight: "100px",
          maxHeight: "250px",
          fontFamily: "Noto Sans, sans-serif",
          overflow: "auto",
        }}
      />

      {[
        {
          helperText:
            "The temperature parameter controls the randomness of the model. 0 is the most logical and 1 is the most creative",
          state: temperature,
          title: "Temperature",
          name: "temperature",
        },
        {
          helperText:
            "Top-p sampling is a way to select the most likely words or phrases from a language model. It allows for control over the coherence and relevance of the generated text.",
          state: topP,
          title: "Top P",
          name: "topP",
        },
        {
          helperText:
            "Frequency Penalty: Encourages diverse, non-repeating text by reducing likelihood of frequent words/phrases.",
          state: frequencyPenalty,
          title: "Frequency Penalty",
          name: "frequencyPenalty",
          max: 2,
          defaultValue: 0,
        },
        {
          helperText:
            "Presence Penalty: Encourages diverse text by reducing likelihood of input-matching words/phrases.",
          state: presencePenalty,
          title: "Presence Penalty",
          name: "presencePenalty",
          max: 2,
          defaultValue: 0,
        },
        {
          helperText:
            "Best of: Generates multiple outputs, selects the best based on specified criteria",
          state: bestOf,
          name: "bestOf",
          title: "Best Of",
          min: 1,
          max: 20,
          step: 1,
        },
      ].map((value, index) => (
        <FormComponent key={index} {...value} handleChange={handleChange} />
      ))}
      <FormControl sx={{ mt: 2 }}>
        <InputLabel id="demo-simple-select-helper-label">
          Image Model Size (Dalle only)
        </InputLabel>
        <Select
          sx={{ mb: 1 }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={size}
          name="size"
          onChange={handleChange}
        >
          {["256x256", "512x512", "1024x1024"].map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Settings;
