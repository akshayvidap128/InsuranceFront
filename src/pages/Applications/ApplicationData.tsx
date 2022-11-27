import React, { ChangeEvent } from "react";
import { useQuery, gql } from "@apollo/client";
import { Questions } from "../../GraphQL/Queries";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Height } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { saveAnswersMutation } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface QuestionProps {
  uuid: string | any;
  type: string | any;
  questionString: string | any;
  sectionUuid: string | any;
  order: number | any;
}

interface AnswerProps {
  answer: string | any;
  questionuud: string | any;
  type: string | any;
}

const ApplicationData = () => {
  const [sectionNameI, setSectionName] = React.useState<string | any>("");
  const [sectionUuidI, setSectionUuid] = React.useState<string | any>("");

  React.useEffect(() => {
    const sname = localStorage.getItem("SectionName");
    const suuid = localStorage.getItem("SectionUuid");
    setSectionName(sname);
    setSectionUuid(suuid);
  });

  const [formData, setFormData] = React.useState<{}>();
  const [inputData, setInputData] = React.useState({
    answer: "",
    questionuuid: "",
    type: "",
  });

  const handleInputChange = (
    // debugger
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    debugger;
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("FormData:-", formData);
  };
  const QuestionType = ({
    uuid,
    type,
    questionString,
    sectionUuid,
    order,
  }: QuestionProps) => {
    switch (type) {
      case "string":
        return (
          <>
            <InputLabel sx={{ color: "#4F4F4F", textAlign: "left" }}>
              {questionString}
            </InputLabel>
            <TextField
              variant="outlined"
              size="small"
              name={uuid}
              fullWidth
              onChange={(event) => {
                handleInputChange(event, type);
                console.log("Input:-", event.target.value);
                // setInputData({
                //   answer: event.target.value,
                //   questionuuid: uuid,
                //   type: type,
                // });
              }}
              // value={}
            />
          </>
        );
      case "bool":
        return (
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={questionString}
            labelPlacement="start"
            sx={{ width: "100%" }}
          />
          // <div className="tooglediv">
          //   <div>
          //     <InputLabel sx={{ color: "#4F4F4F", textAlign: "left" }}>
          //       {uuid}
          //     </InputLabel>
          //   </div>
          //   <div>
          //     <Switch sx={{ float: "right" }} />
          //   </div>
          // </div>
        );
      case "date":
        return (
          <>
            <InputLabel sx={{ color: "#4F4F4F" }}>{uuid}</InputLabel>
            <TextField variant="outlined" size="small" name={uuid} fullWidth />
          </>
        );
      case "float":
        return (
          <>
            <InputLabel sx={{ color: "#4F4F4F" }}>{uuid}</InputLabel>
            <TextField variant="outlined" size="small" name={uuid} fullWidth />
          </>
        );
      default:
        return null;
    }
  };

  const { data } = useQuery(Questions);

  const section = data?.getQuestions.filter(
    ({ uuid, type, questionString, sectionUuid }: QuestionProps) => {
      // return sectionUuid === "f8ec51c2-a188-4a84-a6c8-398708ecd338";
      return sectionUuid === sectionUuidI;
    }
  );

  console.log("DataSections:-", section);

  section.sort((a: QuestionProps, b: QuestionProps) => {
    return a.order >= b.order ? 1 : -1;
  });

  console.log("Sor:-", section);
  const [saveAnswers, { error }] = useMutation(saveAnswersMutation);

  //Writing mutation here to handle
  const handleSubmit = () => {
    saveAnswers({
      variables: {},
    });
    if (error) {
      console.log(error);
    }
  };

  const [form, setForm] = React.useState([]);

  // const handleChangeInput = () => {
  //   const inputState = {
  //     answer: "",
  //     questionUuid: "",
  //     type: "",
  //   };
  //   setForm((prev) => [...prev, inputState]);
  // };

  return (
    <div>
      {/* <form name="myform">
        <InputLabel>Full Name</InputLabel>
        <TextField name="Full name" />
        <InputLabel>Address</InputLabel>
        <TextField name="Address" />
      </form> */}

      <Box sx={{ flexGrow: 1, margin: "15px" }}>
        <Typography variant="h4" gutterBottom>
          {sectionNameI}
        </Typography>
        <Grid container spacing={2}>
          {section.map(
            ({
              uuid,
              type,
              questionString,
              sectionUuid,
              order,
            }: QuestionProps) => {
              return (
                <Grid item xs={6}>
                  <Item>
                    <QuestionType
                      uuid={uuid}
                      type={type}
                      questionString={questionString}
                      sectionUuid={sectionUuid}
                      order={order}
                    />
                  </Item>
                </Grid>
              );
            }
          )}
        </Grid>
      </Box>
      <div>
        <Button
          variant="contained"
          sx={{ margin: "5px" }}
          onClick={() => console.log(form)}
        >
          Save
        </Button>
        <Button variant="contained" sx={{ margin: "5px" }}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ApplicationData;
