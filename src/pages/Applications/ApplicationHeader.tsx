import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const ApplicationHeader = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: "10px", marginBottom: "10px" }}>
      <AppBar position="static" style={{ backgroundColor: "#fcfcfc" }}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            style={{ color: "black" }}
          >
            Submission :
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ApplicationHeader;
