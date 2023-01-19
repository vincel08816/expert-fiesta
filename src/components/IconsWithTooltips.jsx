import React from "react";

import { IconButton, Tooltip } from "@mui/material";

const IconsWithTooltips = ({ title = "", Icon, onClick, sx = {} }) => {
  return (
    <Tooltip title={title}>
      <IconButton sx={sx} onClick={onClick}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default IconsWithTooltips;
