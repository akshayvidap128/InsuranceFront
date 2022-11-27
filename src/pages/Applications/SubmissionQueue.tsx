import React from "react";
import PrimarySearchAppBar from "../Applications/AppBar";
import SelectInsurance from "../Applications/SelectInsurance";

import { useQuery, gql } from "@apollo/client";
import { Questions } from "../../GraphQL/Queries";

import data from "../../json-data/sections.json";

const SubmissionQueue = () => {
  React.useEffect(() => {
    const name = data.sections[0].name;
    const uuid = data.sections[0].uuid;
    localStorage.setItem("SectionName", name);
    localStorage.setItem("Sectionuuid", uuid);
  });
  // const { data } = useQuery(Questions);
  // console.log("SubmissionQ:--", data);
  return (
    <div>
      <PrimarySearchAppBar />
      <SelectInsurance />
      <h2>Submission Queue</h2>
    </div>
  );
};

export default SubmissionQueue;
