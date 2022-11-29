import React from "react";
import AppBar from "./AppBar";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationData from "./ApplicationData";
import SideBar from "./SideBar";
import SessionState from "../../Context/SessionData/SessionState";
import Typography from "@mui/material/Typography";
import ApplicationState from "../../Context/ApplicationData/ApplicationState";

const ApplicationContent = () => {
  const result =
    localStorage.getItem("ApplicationUuid") ===
    "737a535e-ab6c-48ac-bcab-244c7cb59c06";
  return (
    <div>
      <SessionState>
        <AppBar />
        <ApplicationHeader />
        {result ? (
          <div style={{ display: "flex" }}>
            <SideBar />
            <ApplicationData />
          </div>
        ) : (
          <Typography variant="h3">Application In progress</Typography>
        )}
      </SessionState>
    </div>
  );
};

export default ApplicationContent;
