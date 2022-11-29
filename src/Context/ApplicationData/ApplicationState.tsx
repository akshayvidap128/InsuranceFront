import React, { useEffect } from "react";
import ApplicationContext from "./ApplicationContext";

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ApplicationState = (props: { children: any }) => {
  const [astate, setAState] = React.useState({
    name: "",
    uuid: "",
  });
  return (
    <ApplicationContext.Provider value={{ astate, setAState }}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationState;
