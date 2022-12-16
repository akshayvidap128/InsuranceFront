import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Radio,
  Tooltip,
  Typography,
  FormLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { saveQuestionMutation } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import SessionContext from "../../Context/SessionData/SessionContext";
// import { data } from "../../JSON Data/selectInsurance";
// import data from "../../json-data/selectInsurance";
import { insuranceData } from "../../json-data/selectInsurance";
// import QuestionMap from "../Applications/QuestionMap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ApplicationContent from "./ApplicationContent";
import { saveSectionMutation } from "../../GraphQL/Mutations";
// import { ApplicationContext } from "../../Contexts/ApplicationContext";

import { useQuery, gql } from "@apollo/client";
import { Questions } from "../../GraphQL/Queries";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface ApplicationProps {
  uuid: string;
  name: string;
  image: string;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function AddSection() {
  const sessionData = useContext(SessionContext);
  const [application, setApplication] = React.useState("");
  const [section, setSection] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [datatype, setDatatype] = React.useState("");
  const [roles, setRoles] = React.useState("");
  const [order, setOrder] = React.useState("");
  const navigate = useNavigate();

  const [createSection] = useMutation(saveSectionMutation);

  //   setApplication("737a535e-ab6c-48ac-bcab-244c7cb59c06");
  //   console.log("SeesionData Diaolod:-", sessionData?.sstate.uuid);
  //   setSection(sessionData?.sstate.uuid);

  const [open, setOpen] = React.useState(false);
  // const { data } = useQuery(Questions);
  const naviagte = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [selectedApplicationUuid, setselectedApplicationUuid] =
    React.useState<string>();
  // const { selectedApplicationUuid, setselectedApplicationUuid } =
  //   useContext(ApplicationContext);

  return (
    <div style={{ margin: "10px", alignItems: "center" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Section
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add Section
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormControl sx={{ m: 1, minWidth: 500 }} size="small">
            <div style={{ minWidth: 400, display: "flex" }}>
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
            </div>
            {/*  */}

            <div style={{ display: "grid", margin: 0 }}>
              <FormLabel id="question" sx={{ m: 1, minWidth: 300 }}>
                Enter Section Name
              </FormLabel>
              <TextField
                name="section"
                sx={{ width: 300 }}
                onChange={(event: any) => setSection(event.target.value)}
                size="small"
              />
            </div>

            {/* </div> */}
            {/* <div style={{ minWidth: 200, display: "flex" }}>
              <div style={{ display: "grid", margin: 0 }}>
                <FormLabel id="selectDatatype" sx={{ m: 1, minWidth: 300 }}>
                  Roles
                </FormLabel>
                <Select
                  id="roles_id"
                  value={roles}
                  variant="outlined"
                  onChange={(event: any) => {
                    console.log("Roles:-", event.target.value);
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
                  {Roles.map((data) => {
                return (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                );
              })}
                </Select>
              </div>
            </div> */}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={(event: any) => {
              event.preventDefault();
              //   console.log("section", section);
              console.log("dispaly Inoke");
              createSection({
                variables: {
                  applicationUuid: "737a535e-ab6c-48ac-bcab-244c7cb59c06",
                  sectionName: section,
                },
              });
              handleClose();
              // navigate("/submissionQueue");
            }}
          >
            Add
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
