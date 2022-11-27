import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "./SideBar.css";
import data from "../../json-data/sections.json";

const SideBar = () => {
  const handleListItemClick = (name: string, uuid: string) => {
    // const item = { name: name, uuid: uuid };
    localStorage.setItem("SectionName", name);
    localStorage.setItem("Sectionuuid", uuid);
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 260,
        minWidth: 260,
        bgcolor: "background.paper",
        height: "100%",
      }}
      className="application-section"
    >
      <List component="nav" aria-label="application menus">
        {data.sections.map((currentSection) => {
          return (
            <ListItemButton
              key={currentSection.uuid}
              //   selected={
              //     (props.selectedSection &&
              //       props.selectedSection.sectionUuid ===
              //         currentSection.sectionUuid) ??
              //     false
              //   }
              onClick={() =>
                handleListItemClick(currentSection.name, currentSection.uuid)
              }
            >
              <ListItemText primary={currentSection.name} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default SideBar;
