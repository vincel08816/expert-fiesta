import React from "react";
import { Box } from "@mui/system";

const DotLoader = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div id="ball-1" className="circle"></div>
      <div id="ball-2" className="circle"></div>
      <div id="ball-3" className="circle"></div>
    </Box>
  );
};

export default DotLoader;
