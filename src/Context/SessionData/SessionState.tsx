import React, { useEffect } from "react";
import SessionContext from "./SessionContext";
import data from "../../json-data/sections.json";

interface SessionProps {
  uuid: string;
  name: string;
  order: number;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const SessionState = (props: any) => {
  const firstSession = data.sections[0];
  const [sstate, setSState] = React.useState<SessionProps>({
    name: firstSession.name,
    uuid: firstSession.uuid,
    order: firstSession.order,
  });

  return (
    <SessionContext.Provider value={{ sstate, setSState }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionState;
