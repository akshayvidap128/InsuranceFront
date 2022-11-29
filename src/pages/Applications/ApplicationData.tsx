import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useContext,
} from "react";
import { useQuery, gql } from "@apollo/client";
import { Questions, Applicants } from "../../GraphQL/Queries";
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
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  saveAnswersMutation,
  saveApplicantMutation,
} from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import SessionContext from "../../Context/SessionData/SessionContext";
import sidebarData from "../../json-data/sections.json";
import { v4 as uuidv4 } from "uuid";
import optionData from "../../json-data/optionData.json";
import ApplicationContent from "./ApplicationContent";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface ApplicationMutationQuestion {
  question_uuid: string;
  answer: string;
}
const questionWithAnswers = new Array<ApplicationMutationQuestion>();

interface QuestionProps {
  uuid: string | any;
  type: string | any;
  questionString: string | any;
  sectionUuid: string | any;
  order: number | any;
  // eslint-disable-next-line no-restricted-globals
  setformDataHandler: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.FormEvent<
          | HTMLInputElement
          | HTMLTextAreaElement
          | SyntheticEvent<Element, Event>
          | FormEvent<HTMLFormElement>
        >,
    value: string,
    uuid: string,
    ty: string
  ) => void;
}

interface AnswerProps {
  answer: string | any;
  questionUuid: string | any;
  type: string | any;
}

const listAnswer = new Array<AnswerProps>();

const QuestionType = ({
  uuid,
  type,
  questionString,
  sectionUuid,
  order,
  setformDataHandler,
}: QuestionProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const handleInputChange = (
    event:
      | any
      | React.FormEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLTextAreaElement
        >
      | SyntheticEvent<Element, Event>
      | SelectChangeEvent<Event>
      | FormEvent<HTMLFormElement>,
    uuid: string
  ) => {
    // const { name, value } = (event.target as HTMLInputElement).value;
    // console.log("NAme:", name);
    const value = (event.target as HTMLInputElement).value;
    setformDataHandler(event, value, uuid, type);
  };
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
              handleInputChange(event, uuid);
            }}
            // value={}
          />
        </>
      );
    case "bool":
      return (
        <FormControlLabel
          control={<Switch />}
          label={questionString}
          labelPlacement="end"
          sx={{ width: "100%" }}
          onChange={(event) => {
            handleInputChange(event, uuid);
          }}
        />
      );
    case "date":
      return (
        <>
          <InputLabel sx={{ color: "#4F4F4F", textAlign: "left" }}>
            {questionString}
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // label={questionString}
              value={value}
              onChange={(event) => {
                handleInputChange(event, uuid);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </>
      );
    case "float":
      return (
        <>
          <InputLabel sx={{ color: "#4F4F4F" }}> {questionString}</InputLabel>
          <TextField
            variant="outlined"
            size="small"
            name={uuid}
            fullWidth
            onChange={(event) => {
              handleInputChange(event, uuid);
            }}
          />
        </>
      );
    case "label":
      return (
        <>
          <InputLabel sx={{ color: "#4F4F4F" }}> {questionString}</InputLabel>
        </>
      );
    case "list":
      return (
        <>
          <InputLabel sx={{ color: "#4F4F4F" }}>{questionString}</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            variant="outlined"
            onChange={(event) => {
              handleInputChange(event, uuid);
            }}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>$0 to $500,000</MenuItem>
            <MenuItem value={20}>$3,000,000 to $4,000,000</MenuItem>
            <MenuItem value={30}>$7,000,000 to $8,000,000</MenuItem>
          </Select>
        </>
      );
    default:
      return null;
  }
};

const ApplicationData = () => {
  const navigate = useNavigate();
  const sessionData = useContext(SessionContext);

  const [saveAnswers, { error }] = useMutation(saveAnswersMutation);
  const [saveForm] = useMutation(saveApplicantMutation);
  const [key, setKey] = React.useState<string | null>(null);

  // console.log("sessionData:", sessionData);
  // console.log("Sessionuuid:-", typeOf(sessionData.sstate.uuid));
  // const { sessionName, sessionUuid } = sessionData.sstate;
  // const sectionuuid: string = sessionName;
  // sessionData.sstate.uuid;
  {
    const { data } = useQuery(Applicants);
    console.log("Application:-", data?.applicantForms);
  }
  const { data } = useQuery(Questions);
  console.log("Question:-", data?.getQuestions);

  const section = data?.getQuestions.filter(
    ({ sectionUuid }: QuestionProps) => {
      // return sectionUuid === "f8ec51c2-a188-4a84-a6c8-398708ecd338"
      return sectionUuid === sessionData?.sstate.uuid;
    }
  );

  // console.log("DataSections:-", section);

  section.sort((a: QuestionProps, b: QuestionProps) => {
    return a.order >= b.order ? 1 : -1;
  });

  console.log("Sort:-", section);

  const [form, setForm] = React.useState([]);

  const setformDataHandler = (
    event: any,
    value: string,
    uuid: string,
    ty: string
  ) => {
    listAnswer.push({
      questionUuid: uuid,
      answer: value,
      type: ty,
    });
  };

  const display = () => {
    console.log("dispaly Inoke");
    let myuuid = uuidv4(); //Added new UUID for Application

    saveForm({
      variables: {
        uuid: myuuid,
        name: myuuid,
      },
    });
    console.log("list", listAnswer);
    saveAnswers({
      // variables are also typed!
      variables: {
        applicationUuid: myuuid,
        answers: listAnswer,
        type: "string",
      },
    });
    if (error) {
      console.log(error);
    }
    navigate("/submissionQueue");
  };
  const nextDisplay = () => {
    let i: number = 0;
    sidebarData.sections.forEach((data, index) => {
      if (data.uuid === sessionData?.sstate.uuid) {
        i = index;
      }
    });
    console.log("index:-", i);
    if (i <= 3) {
      const item = {
        name: sidebarData.sections[i + 1].name,
        uuid: sidebarData.sections[i + 1].uuid,
      };
      sessionData.setSState(item);
    }
  };
  const perviousDisplay = () => {
    let i: number = 0;
    sidebarData.sections.forEach((data, index) => {
      if (data.uuid === sessionData?.sstate.uuid) {
        i = index;
      }
    });
    console.log("index:-", i);
    if (i >= 0) {
      const item = {
        name: sidebarData.sections[i - 1].name,
        uuid: sidebarData.sections[i - 1].uuid,
      };
      sessionData.setSState(item);
    }
  };

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1, margin: "15px" }}>
          <Typography variant="h4" gutterBottom>
            {sessionData?.sstate.name}
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
                        setformDataHandler={setformDataHandler}
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
            onClick={() => perviousDisplay()}
          >
            pervious
          </Button>
          <Button
            variant="contained"
            sx={{ margin: "5px" }}
            onClick={() => nextDisplay()}
          >
            Next
          </Button>
          <Button
            variant="contained"
            sx={{ margin: "5px" }}
            onClick={() => display()}
          >
            Save
          </Button>
          <Button variant="contained" sx={{ margin: "5px" }}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default ApplicationData;
function typeOf(uuid: any): any {
  throw new Error("Function not implemented.");
}
