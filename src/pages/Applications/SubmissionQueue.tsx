import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PrimarySearchAppBar from "../Applications/AppBar";
import SelectInsurance from "../Applications/SelectInsurance";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Applicants } from "../../GraphQL/Queries";
import AddSection from "./AddSection";

import { useQuery, gql } from "@apollo/client";
import {
  UserQuestions,
  ManagerQuestions,
  AppeaserQuestions,
} from "../../GraphQL/Queries";
import applicationData from "../../json-data/application.json";
import ViewApplication from "./ViewApplication";

import sectiondata from "../../json-data/sections.json";
import ApplicationData from "./ApplicationData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SubmissionQueue = () => {
  const navigate = useNavigate();

  const { data } = useQuery(Applicants);
  console.log("Applicants:-", data?.applicantForms);
  const role = localStorage.getItem("Role");
  // const { data } = useQuery(Applicants, {
  //   variables: { applicationUuid: "737a535e-ab6c-48ac-bcab-244c7cb59c06" },
  // });
  // console.log("Application Data:-", data?.getApplicationWithQuestion());
  React.useEffect(() => {
    const name = sectiondata.sections[0].name;
    const uuid = sectiondata.sections[0].uuid;
    localStorage.setItem("SectionName", name);
    localStorage.setItem("Sectionuuid", uuid);
  });
  {
    const { data } = useQuery(UserQuestions);
    console.log("SubmissionU:--", data?.getUserQuestions);
  }
  {
    const { data } = useQuery(ManagerQuestions);
    console.log("SubmissionM:--", data?.getManagerQuestions);
  }
  {
    const { data } = useQuery(AppeaserQuestions);
    console.log("SubmissionA:--", data?.getAppeaserQuestions);
  }
  // window.location.reload();
  return (
    <div>
      <PrimarySearchAppBar />
      <SelectInsurance />
      {role?.includes("admin") ? (
        <>
          <Button
            variant="outlined"
            sx={{ marginLeft: "10px" }}
            onClick={() => navigate("/addQuestion")}
          >
            Add Question
          </Button>
          <AddSection />
        </>
      ) : null}
      <h2>Submission Queue</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ textAlign: "center" }}>
                Applicant Name
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>
                Insurance Type
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>
                CreateAt
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>
                View
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.applicantForms.map((row: any) => (
              <StyledTableRow key={row.uuid}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  Home Health Care Insurance
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  {row.createdAt}
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{ margin: "5px" }}
                    onClick={() => {
                      localStorage.setItem("ApplicantUuid", row.uuid);
                      navigate("/viewApplicant");
                    }}
                  >
                    View
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SubmissionQueue;
