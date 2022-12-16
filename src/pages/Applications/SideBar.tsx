import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "./SideBar.css";
// import data from "../../json-data/sections.json";
import SessionContext from "../../Context/SessionData/SessionContext";
import { useQuery } from "@apollo/client";
import { Sections } from "../../GraphQL/Queries";

const SideBar = () => {
  const sessionData = useContext(SessionContext);

  const { data } = useQuery(Sections);
  // console.log("SectionsGraph:-", data);

  // useEffect(() => {
  //   sessionData.setsetSState
  // })

  const handleListItemClick = (name: string, uuid: string, order: number) => {
    const item = { name: name, uuid: uuid };
    sessionData.setSState(item);
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
        {data?.getSections.map((currentSection: any) => {
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
                handleListItemClick(
                  currentSection.name,
                  currentSection.uuid,
                  currentSection.order
                )
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
