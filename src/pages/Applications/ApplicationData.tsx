import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useContext,
} from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Applicants,
  UserQuestions,
  ManagerQuestions,
  AppeaserQuestions,
} from "../../GraphQL/Queries";
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
import AddQuestionDialog from "../Applications/AddQuestionDialog";

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

  role: string | any;

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
  role,
  setformDataHandler,
}: QuestionProps | any) => {
  const [value, setValue] = React.useState<Dayjs | null>();

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
    // console.log("Select:-", event.target.value);
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
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                const message = value?.toString;
                // setformDataHandler(message, uuid, type);
                console.log("Data:-", value);
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
    case "list": {
      if (uuid === "a53ab940-6d4d-424a-8c27-2a85203eb80d") {
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
              <MenuItem value={"$0 to $500,000"}>$0 to $500,000</MenuItem>
              <MenuItem value={"$3,000,000 to $4,000,000"}>
                $3,000,000 to $4,000,000
              </MenuItem>
              <MenuItem value={"$7,000,000 to $8,000,000"}>
                $7,000,000 to $8,000,000
              </MenuItem>
              <MenuItem value={"$7,000,000 to $8,000,000"}>
                $500,000 to $1,000,000
              </MenuItem>
            </Select>
          </>
        );
      }
      if (uuid === "17679773-734a-4b0d-a908-625200cc3073") {
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
              <MenuItem value={"Never"}>Never</MenuItem>
              <MenuItem value={"Every 60 days"}>Every 60 days</MenuItem>
              <MenuItem value={">60 days"}>{`>60 days`}</MenuItem>
            </Select>
          </>
        );
      }
      if (uuid === "afff0883-ed9f-4ab9-9aa6-e63f66e32908") {
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
              <MenuItem value={"On Hire Only"}>On Hire Only</MenuItem>
              <MenuItem value={"Semi Annually"}>Semi Annually</MenuItem>
              <MenuItem value={"Annually"}>Annually</MenuItem>
            </Select>
          </>
        );
      }
      break;
    }
    default:
      return <></>;
  }
};

const ApplicationData = () => {
  const navigate = useNavigate();
  const sessionData = useContext(SessionContext);

  const [saveAnswers, { error }] = useMutation(saveAnswersMutation);
  const [saveForm] = useMutation(saveApplicantMutation);
  const [key, setKey] = React.useState<string | null>(null);

  {
    const { data } = useQuery(Applicants);
    console.log("Application:-", data?.applicantForms);
  }

  let rolevalue = localStorage.getItem("Role");

  console.log("SessionData:-", sessionData);

  console.log("rolevalue:-", rolevalue);

  let section;

  if (rolevalue?.includes("agent")) {
    console.log("In user");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useQuery(UserQuestions);
    console.log("Question:-", data);
    section = data?.getUserQuestions.filter(
      ({ sectionUuid }: QuestionProps) => {
        // return sectionUuid === "f8ec51c2-a188-4a84-a6c8-398708ecd338";
        return sectionUuid === sessionData?.sstate.uuid;
      }
    );
  } else if (rolevalue?.includes("underwriter")) {
    console.log("In Appeaser");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useQuery(AppeaserQuestions);
    console.log("Question:-", data);
    section = data?.getAppeaserQuestions.filter(
      ({ sectionUuid }: QuestionProps) => {
        // return sectionUuid === "f8ec51c2-a188-4a84-a6c8-398708ecd338"
        return sectionUuid === sessionData?.sstate.uuid;
      }
    );
  } else if (rolevalue?.includes("admin")) {
    console.log("In Admin");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useQuery(ManagerQuestions);
    console.log("Question:-", data);
    section = data?.getManagerQuestions.filter(
      ({ sectionUuid }: QuestionProps) => {
        // return sectionUuid === "f8ec51c2-a188-4a84-a6c8-398708ecd338"
        return sectionUuid === sessionData?.sstate.uuid;
      }
    );
    console.log("Sectionadmin:-", sessionData?.sstate.uuid);
    console.log("IN......admin:-", section);
  }
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
                role,
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
                        role={role}
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
          <Button
            variant="contained"
            sx={{ margin: "5px" }}
            onClick={() => {
              navigate("/submissionQueue");
            }}
          >
            Cancel
          </Button>
          {rolevalue?.includes("admin") ? (
            // <Button
            //   variant="outlined"
            //   sx={{ margin: "5px" }}
            //   // onClick={() => display()}
            // >

            // </Button>
            <AddQuestionDialog />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationData;
function typeOf(uuid: any): any {
  throw new Error("Function not implemented.");
}
