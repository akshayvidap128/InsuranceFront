import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  InputLabel,
  Container,
  FormControlLabel,
  Checkbox,
  Stack,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // reset();
  }
  const naviagte = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Paper elevation={5} className="paperStyle">
          <Stack sx={{ textAlign: "center", mb: "15px" }} spacing={1}>
            <div>
              <img src={logo} alt="logo" className="logoImage" />
            </div>
            <Typography variant="h5" color="primary">
              Sign in
            </Typography>
            {/* {error ? (
              <Typography variant="h5" color="error">
                Invalid Credentials. Please try again.
              </Typography>
            ) : null} */}
          </Stack>

          <Container>
            {/* <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ float: "left" }}
              onClick={(event) => {
                console.log("Radio", event.target.value);
                localStorage.setItem("Role", event.target.value);
              }}
            >
              <FormControlLabel value="User" control={<Radio />} label="User" />
              <FormControlLabel
                value="Manager"
                control={<Radio />}
                label="Manger"
              />
              <FormControlLabel
                value="Appeaser"
                control={<Radio />}
                label="Appeaser"
              />
            </RadioGroup> */}
            <br />
            <InputLabel
              sx={{
                textAlign: "left",
                float: "left",
              }}
            >
              Email/Username
            </InputLabel>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Username"
              fullWidth
              name="username"
              type="email"
              required
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <InputLabel sx={{ textAlign: "left", mt: "20px" }}>
              Password
            </InputLabel>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Password"
              fullWidth
              name="password"
              type="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <Typography align="right">
              <Link href="#" underline="none" color="primary">
                Forgot password ?
              </Link>
            </Typography>
            <FormControlLabel
              control={<Checkbox defaultChecked color="primary" size="small" />}
              label="Remember Me"
              name="rememberMe"
              sx={{ float: "left", mt: "20px" }}
            />
            <br />
            <br />

            <div style={{ marginTop: "5px" }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className="app-prim-btn"
                fullWidth
                onClick={() => {
                  localStorage.setItem("Role", userName);
                  naviagte("/submissionQueue");
                }}
              >
                Sign in
              </Button>
            </div>
          </Container>
        </Paper>
      </form>
    </div>
  );

  //   return (
  //     <div>Login</div>
  //   )
};
