import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import backgroundImage from "../Components/chatbot-background.jpg";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import axios from "axios";
import { db, auth, provider } from "../Components/firebase-config.js";
import {
  getDocs,
  addDoc,
  collection,
  where,
  query,
  doc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const dbref = collection(db, "Auth");

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Register() {
  // Real
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const [formValid, setFormValid] = React.useState();

  const [inputs, setInputs] = React.useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleEmail = () => {
    console.log(isEmail(inputs.email));
    if (!isEmail(inputs.email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  const handlePassword = () => {
    if (
      !inputs.password ||
      inputs.password.length < 6 ||
      inputs.password.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  const handleConfirmPassword = () => {
    if (inputs.password !== inputs.confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    setConfirmPasswordError(false);
  };

  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setSuccess(null);

    if (emailError || !inputs.email) {
      setSuccess("Email is Invalid. Please Re-Enter");
    }

    // If Password error is true
    if (passwordError || !inputs.password) {
      setSuccess(
        "Password is set btw 6 - 20 characters long. Please Re-Enter."
      );
    }

    const findUsername = query(dbref, where("Username", "==", inputs.userName));

    const snapshot = await getDocs(findUsername);
    const usernameFoundArray = snapshot.docs.map((doc) => doc.data);

    if (usernameFoundArray.length > 0) {
      // alert("Username already exists");
      // return res.status(500).json("Username exists.");
      setSuccess("Username already exists. Please choose a different username");
    } else {
      const findEmail = query(dbref, where("Email", "==", inputs.email));

      const snapshot = await getDocs(findEmail);
      const emailFoundArray = snapshot.docs.map((doc) => doc.data);

      if (emailFoundArray.length > 0) {
        // alert("Email already exists");
        // return res.status(501).json("Email exists.");
        setSuccess("Email already exists. Please choose a different username");
      } else {
        const res = await createUserWithEmailAndPassword(
          auth,
          inputs.email,
          inputs.password
        );

        await addDoc(dbref, {
          Name: inputs.fullName,
          Username: inputs.userName,
          Email: inputs.email,
          Password: inputs.password,
          UID: res.user.uid,
        });
        // return res.status(200).json("User has been created.");
        setSuccess("Registration succcessful.");
      }
    }

    // try {
    //   await axios.post(
    //     "http://localhost:8800/api/controller/auth/register",
    //     inputs
    //   );
    //   setSuccess("Registration successful.");
    // } catch (err) {
    //   if (err.response.status === 500)
    //     setSuccess(
    //       "Username already exists. Please choose a different username"
    //     );
    //   else
    //     setSuccess("Email already exists. Please choose a different username");
    // }
  };

  console.log(err);

  // Boleh delete nanti
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Input
  // const [fullName, setfullName] = React.useState("");
  // const [userName, setUserName] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [confirmPassword, setConfirmPassword] = React.useState("");
  //   const handleUsername = (event) => {};

  // Input Error
  // const [emailError, setEmailError] = React.useState(false);
  // const [passwordError, setPasswordError] = React.useState(false);
  // const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  // Form validity
  // const [formValid, setFormValid] = React.useState();
  // const [success, setSuccess] = React.useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handleEmail = () => {
  //   console.log(isEmail(email));
  //   if (!isEmail(email)) {
  //     setEmailError(true);
  //     return;
  //   }

  //   setEmailError(false);
  // };

  // const handlePassword = () => {
  //   if (!password || password.length < 6 || password.length > 20) {
  //     setPasswordError(true);
  //     return;
  //   }

  //   setPasswordError(false);
  // };

  // const handleConfirmPassword = () => {
  //   if (password !== confirmPassword) {
  //     setConfirmPasswordError(true);
  //     return;
  //   }

  //   setConfirmPasswordError(false);
  // };

  // const handleSubmit = () => {
  //   setSuccess(null);
  //   //First of all Check for Errors

  //   // IF username error is true
  //   //   if (usernameError || !usernameInput) {
  //   //     setFormValid(
  //   //       "Username is set btw 5 - 15 characters long. Please Re-Enter"
  //   //     );
  //   //     return;
  //   //   }

  //   // If Email error is true
  //   if (emailError || !email) {
  //     setFormValid("Email is Invalid. Please Re-Enter");
  //     return;
  //   }

  //   // If Password error is true
  //   if (passwordError || !password) {
  //     setFormValid(
  //       "Password is set btw 6 - 20 characters long. Please Re-Enter."
  //     );
  //     return;
  //   }

  //   if (confirmPasswordError || !confirmPassword) {
  //     setFormValid("Password does not match. Please Re-Enter");
  //     return;
  //   }
  //   setFormValid(null);

  //   // Proceed to use the information passed
  //   console.log("Full Name : " + fullName);
  //   console.log("Username : " + userName);
  //   console.log("Email : " + email);
  //   console.log("Password : " + password);
  //   console.log("Confirm Password : " + confirmPassword);

  //   //Show Successfull Submittion
  //   setSuccess("Form Submitted Successfully");
  // };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "200px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid
        item
        xs={12}
        sm={2}
        md={4}
        elevation={4}
        sx={{
          height: "738px",
          width: "489px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#53A2BE", // Set the background color
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 1,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ margin: "5px", mb: "30px", fontFamily: "Calistoga" }}
          >
            Please Fill Out Form to Register!
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel sx={{ fontFamily: "Calistoga" }}>Full Name</FormLabel>
              <OutlinedInput
                id="fullName"
                name="fullName"
                autoComplete="fullName"
                placeholder=""
                required
                // value={fullName}
                onChange={handleChange}
                // onChange={(event) => {
                //   setfullName(event.target.value);
                // }}
                sx={{ backgroundColor: "white", width: "100%" }}
              />
            </FormGrid>
          </Box>
          <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel sx={{ fontFamily: "Calistoga" }}>Username</FormLabel>
              <OutlinedInput
                id="username"
                name="userName"
                autoComplete="username"
                placeholder=""
                required
                // value={userName}
                onChange={handleChange}
                // onChange={(event) => {
                //   setUserName(event.target.value);
                // }}
                sx={{ backgroundColor: "white", width: "100%" }}
              />
            </FormGrid>
          </Box>
          <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel sx={{ fontFamily: "Calistoga" }}>Email</FormLabel>
              <OutlinedInput
                id="Email"
                name="email"
                autoComplete="Email"
                placeholder=""
                required
                // value={email}
                onChange={handleChange}
                // error={emailError}
                // onBlur={handleEmail}
                // onChange={(event) => {
                //   setEmail(event.target.value);
                // }}
                sx={{ backgroundColor: "white", width: "100%" }}
              />
            </FormGrid>
          </Box>
          <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel sx={{ fontFamily: "Calistoga" }}>Password</FormLabel>
              <OutlinedInput
                id="password"
                name="password"
                autoComplete="password"
                placeholder=""
                required
                // value={password}
                onChange={handleChange}
                // error={passwordError}
                // onBlur={handlePassword}
                type={showPassword ? "text" : "password"}
                // onChange={(event) => {
                //   setPassword(event.target.value);
                // }}
                sx={{ backgroundColor: "white", width: "100%" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormGrid>
          </Box>
          <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel sx={{ fontFamily: "Calistoga" }}>
                Confirm Password
              </FormLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="confirmPassword"
                placeholder=""
                required
                // value={confirmPassword}
                onChange={handleChange}
                // error={confirmPasswordError}
                // onBlur={handleConfirmPassword}
                type={showConfirmPassword ? "text" : "confirmPassword"}
                // onChange={(event) => {
                //   setConfirmPassword(event.target.value);
                // }}
                sx={{ backgroundColor: "white", width: "100%" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormGrid>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              height: "63px",
              width: "243px",
              backgroundColor: "#176087",
              "&:hover": {
                backgroundColor: "#14506E",
              },
              fontFamily: "Calistoga",
            }}
            onClick={handleClick}
          >
            Register
          </Button>
          {/* {formValid && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="error" size="small">
                {formValid}
              </Alert>
            </Stack>
          )} */}

          {success && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="success" size="small">
                {success}
              </Alert>
            </Stack>
          )}
          <Grid item>
            <Typography sx={{ fontFamily: "Calistoga" }}>
              I have an account
              <Link to="/Login"> Login</Link>
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
