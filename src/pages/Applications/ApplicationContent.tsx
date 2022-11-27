import React from "react";
import AppBar from "./AppBar";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationData from "./ApplicationData";
import SideBar from "./SideBar";
// import { AnswersContext } from "../../Context/AnswersContext";
// import { useContext } from "react";

const ApplicationContent = () => {
  return (
    <div>
      <AppBar />
      <ApplicationHeader />
      <div style={{ display: "flex" }}>
        <SideBar />
        <ApplicationData />
      </div>
    </div>
  );
};

export default ApplicationContent;
