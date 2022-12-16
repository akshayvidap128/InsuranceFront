import React from "react";
import PrimarySearchAppBar from "../Applications/AppBar";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { insuranceData } from "../../json-data/selectInsurance";
// import data from "../../json-data/sections.json";
// import { Datatype, Roles } from "../../json-data/datatype";
import { Datatype, Roles } from "../../json-data/datatypes";
import { saveQuestionMutation } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Sections } from "../../GraphQL/Queries";

const AddQuestion = () => {
  const [application, setApplication] = React.useState("");
  const [section, setSection] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [datatype, setDatatype] = React.useState("");
  const [roles, setRoles] = React.useState("");
  const [order, setOrder] = React.useState("");
  const navigate = useNavigate();
  const { data } = useQuery(Sections);
  console.log("Section:-", data);

  const [createQuestion] = useMutation(saveQuestionMutation);
  return (
    <>
      <PrimarySearchAppBar />
      <FormControl sx={{ m: 1, minWidth: 500 }} size="small">
        <div style={{ minWidth: 200, display: "flex" }}>
          <div style={{ display: "grid", margin: 0 }}>
            <FormLabel id="selectApplication" sx={{ m: 1, minWidth: 300 }}>
              Select Application
            </FormLabel>
            <Select
              id="selectApplication"
              // value={insuranceData}
              onChange={(event: any) => {
                // console.log("App", event.target.value);
                setApplication(event.target.value);
              }}
              sx={{ width: 300 }}
            >
              {insuranceData.map((d: any) => {
                return (
                  <MenuItem key={d.uuid} value={d.uuid}>
                    {d.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div style={{ display: "grid", margin: 0 }}>
            <FormLabel id="selectsection" sx={{ m: 1, minWidth: 500 }}>
              Select Section
            </FormLabel>
            <Select
              id="selectSection"
              //  value={insuranceData}
              onChange={(event: any) => {
                // console.log("App", event.target.value);
                setSection(event.target.value);
              }}
              sx={{ width: 300 }}
            >
              {data?.getSections.map((d: any) => {
                return (
                  <MenuItem key={d.uuid} value={d.uuid}>
                    {d.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
        {/*  */}
        <div style={{ minWidth: 200, display: "flex" }}>
          <div style={{ display: "grid", margin: 0 }}>
            <FormLabel id="question" sx={{ m: 1, minWidth: 300 }}>
              Question
            </FormLabel>
            <TextField
              name="question"
              sx={{ width: 300 }}
              onChange={(event: any) => setQuestion(event.target.value)}
              size="small"
            />
          </div>
          <div style={{ display: "grid", margin: 0 }}>
            <FormLabel id="selectDatatype" sx={{ m: 1, minWidth: 500 }}>
              Datatype
            </FormLabel>
            <Select
              id="selectDatatype"
              //   value={insuranceData}
              onChange={(event: any) => {
                // console.log("App", event.target.value);
                setDatatype(event.target.value);
              }}
              sx={{ width: 300 }}
              size="small"
            >
              <MenuItem value="string" key="string">
                String
              </MenuItem>
              <MenuItem value="list" key="list">
                List
              </MenuItem>
              <MenuItem value="bool" key="bool">
                Boolean
              </MenuItem>
              <MenuItem value="date" key="date">
                Date
              </MenuItem>
              <MenuItem value="float" key="float">
                Float
              </MenuItem>
            </Select>
          </div>
        </div>
        <div style={{ minWidth: 200, display: "flex" }}>
          <div style={{ display: "grid", margin: 0 }}>
            {/* <FormLabel id="order" sx={{ m: 1, minWidth: 300 }}>
              Order
            </FormLabel>
            <TextField
              name="order"
              sx={{ width: 300 }}
              onChange={(event: any) => setOrder(event.target.value)}
            /> */}
          </div>
          <div style={{ display: "grid", margin: 0 }}>
            <FormLabel id="selectDatatype" sx={{ m: 1, minWidth: 300 }}>
              Roles
            </FormLabel>
            <Select
              id="roles_id"
              value={roles}
              variant="outlined"
              onChange={(event: any) => {
                setRoles(event.target.value);
              }}
            >
              <MenuItem key="User" value="User">
                Agent
              </MenuItem>
              <MenuItem key="Manager" value="Manager">
                Admin
              </MenuItem>
              <MenuItem key="Appeaser" value="Appeaser">
                Underwriter
              </MenuItem>
              {/* {Roles.map((data) => {
                return (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                );
              })} */}
            </Select>
          </div>
        </div>
        <div style={{ minWidth: 200, display: "flex", marginTop: 20 }}>
          <div style={{ display: "grid", margin: 0, marginRight: 20 }}>
            <Button
              variant="contained"
              onClick={(event: any) => {
                event.preventDefault();
                console.log("section", section);
                console.log("dispaly Inoke");
                createQuestion({
                  variables: {
                    applicationUuid: application,
                    questionString: question,
                    sectionUuid: section,
                    type: datatype,
                    role: roles,
                  },
                });
                navigate("/submissionQueue");
              }}
            >
              Add
            </Button>
          </div>
          <div style={{ display: "grid", margin: 0 }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/submissionQueue");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </FormControl>
    </>
  );
};
export default AddQuestion;
