import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useFormContext } from "../../contexts/FormContext";

// rename this function so it better fits criteria
export default () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openSelectMenu = Boolean(anchorEl);
  const { form, handleChange } = useFormContext();
  const iconSx = { width: 20, height: 20 };
  const iconButtonSx = {
    ml: 1,
    mb: 0.5,
  };

  return (
    <Box>
      <Tooltip title="GPT-3.5 Or DALL·E 2">
        <IconButton
          sx={iconButtonSx}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          {form.type === "text" ? (
            <TextsmsIcon sx={iconSx} />
          ) : (
            <ImageSearchIcon sx={iconSx} />
          )}
        </IconButton>
      </Tooltip>

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
        {[
          {
            title: "GPT 3.5 Text Generation",
            value: "text",
            icon: <TextsmsIcon />,
          },
          {
            title: "DALL·E 2 Image Generation",
            value: "image",
            icon: <ImageSearchIcon />,
          },
        ].map(({ title, value, icon }, index) => (
          <MenuItem
            key={title + index}
            sx={{ fontSize: "12px", display: "flex", alignItems: "center" }}
            name="promptHeader"
            value={value}
            onClick={(e) => {
              handleChange({
                target: { name: "type", value },
                preventDefault: () => {},
              });
              setAnchorEl(null);
            }}
          >
            {icon}
            <Typography variant="body-2" sx={{ ml: 0.5 }}>
              {title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
