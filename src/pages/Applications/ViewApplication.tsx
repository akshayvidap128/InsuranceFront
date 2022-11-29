import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ViewApplicant } from "../../GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { isConstructorDeclaration } from "typescript";

const ViewApplication = () => {
  const navigate = useNavigate();

  const [applicantUuid, setApplicantUuid] = React.useState<string | null>("");
  React.useEffect(() => {
    setApplicantUuid(localStorage.getItem("ApplicantUuid"));
  });

  const { loading, data } = useQuery(ViewApplicant, {
    variables: { applicantUuid: applicantUuid },
  });
  console.log("Auuid:-", applicantUuid);
  console.log("view:-", data?.getApplicantWithQuestion);
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Applicant Name:{data?.getApplicantWithQuestion.name}
      </Typography>
      <Button
        variant="contained"
        sx={{ margin: "5px" }}
        onClick={() => {
          navigate("/submissionQueue");
        }}
      >
        Go To SubmissionQueue
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Question String</TableCell>
              <TableCell align="right">Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getApplicantWithQuestion.questions.map((row: any) => (
              <TableRow
                key={row.questionString}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.questionString}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.answer.answer}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewApplication;
