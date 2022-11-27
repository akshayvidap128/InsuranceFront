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
} from "@mui/material";
// import { data } from "../../JSON Data/selectInsurance";
// import data from "../../json-data/selectInsurance";
import { insuranceData } from "../../json-data/selectInsurance";
// import QuestionMap from "../Applications/QuestionMap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ApplicationContent from "./ApplicationContent";
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

export default function SelectInsurance() {
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
        Create Submission
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
          Select a Insurance
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={4} columnSpacing={3}>
            {insuranceData.map(
              ({ uuid, name, image }: ApplicationProps) => {
                // const  = application;
                // console.log(`../../assest/${image}`)
                const isSelected = selectedApplicationUuid
                  ? uuid === selectedApplicationUuid
                  : false;

                return (
                  <Grid item key={uuid}>
                    <Card
                      key={uuid}
                      onClick={() => {
                        setselectedApplicationUuid(uuid);
                      }}
                      variant="outlined"
                      data-application-entity-name={name}
                      data-application-name={name}
                      data-application-uuid={uuid}
                    >
                      <Tooltip title={`${name} `}>
                        <Grid
                          container
                          justifyContent={"center"}
                          alignContent={"center"}
                        >
                          <Grid
                            item
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              padding: "2px",
                              background: "#F3F3F3",
                            }}
                          >
                            <Box>
                              <Radio checked={isSelected} size="small" />
                            </Box>
                          </Grid>
                          <Grid item sx={{ padding: 1 }}>
                            <img
                              src={image}
                              alt={name}
                              style={{
                                objectFit: "contain",
                                height: 60,
                                width: 100,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Tooltip>
                    </Card>
                  </Grid>
                );
              }
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              if (selectedApplicationUuid) {
                console.log(selectedApplicationUuid);
                naviagte("/applicationContent");
                setOpen(false);
              }
            }}
          >
            Create
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
