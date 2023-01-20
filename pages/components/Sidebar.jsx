import { TextareaAutosize } from "@mui/base";
import {
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import React from "react";
import { useAppContext } from "../AppContext";
import SidebarNav from "./SidebarNav";

const width = "240px";

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
  <FormControl sx={{ width, mt: 2 }}>
    <Tooltip title={helperText} placement="bottom">
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

const Settings = () => {
  const { form, handleChange, setAllowEnterToSubmit } = useAppContext();

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
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        p: 5,
        pt: 10,
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <FormControl sx={{ width, mb: 2 }}>
        <InputLabel id="demo-simple-select-helper-label">Model</InputLabel>
        <Select
          sx={{ mb: 1 }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
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

      <Typography variant="body2" sx={{ mb: 1 }}>
        Prompt Header
      </Typography>

      <TextareaAutosize
        placeholder="This header allows you to write a short description on top of the prompt"
        value={form.topText}
        name="topText"
        onChange={handleChange}
        style={{
          padding: "12px",
          minHeight: "100px",
          maxHeight: "250px",
          // resize: "none",
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
      <FormControl sx={{ width, mt: 2, mb: 2 }}>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
          mb: 1,
        }}
      >
        <Typography variant="body2">Allow Enter To Send</Typography>
        <Switch
          defaultChecked
          onClick={() => setAllowEnterToSubmit((prev) => !prev)}
        />
      </Box>
    </Box>
  );
};

const Sidebar = (props) => {
  const { openSidebar, setOpenSidebar } = useAppContext();

  if (!openSidebar) return "";
  const toggleDrawer = () => setOpenSidebar((prev) => !prev);

  return (
    <Drawer
      anchor={"left"}
      open={openSidebar}
      onClose={toggleDrawer}
      sx={{
        display: "flex",
        width: 300,
        borderRadius: "10px 0 0 10px",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        zIndex: 1000,
      }}
    >
      <Settings {...props} />
      <SidebarNav {...props} />
    </Drawer>
  );
};

export default Sidebar;
