import { Box } from "@mui/system";
import React from "react";

import { IconButton, Tooltip } from "@mui/material";

const IconsWithTooltips = ({
  title = "",
  Icon = Box,
  onClick = () => {},
  sx = {},
}) => {
  return (
    <Tooltip title={title}>
      <IconButton sx={sx} onClick={onClick}>
        <Icon
          sx={{
            "&:hover": {
              color: "#1a76d2",
            },
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default IconsWithTooltips;
