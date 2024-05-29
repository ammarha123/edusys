import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import backgroundImage from "../Components/chatbot-background.jpg";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { db, auth, provider } from "../Components/firebase-config.js";
import {
  getDocs,
  addDoc,
  setDoc,
  collection,
  where,
  query,
  doc,
} from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { Cookie } from "@mui/icons-material";

const dbref = collection(db, "Auth");
const cookies = new Cookies();
// const cookiesName = new Cookies();

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Login() {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const [isAuth, setIsAuth] = React.useState(cookies.get("auth-token"));
  // const [userLogin, setUserLogin] = React.useState(cookies.get("name-token"));

  const [err, setErr] = React.useState(false);
  const [success, setSuccess] = React.useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log(inputs);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const emailMatch = query(dbref, where("Email", "==", inputs.email));
    const emailSnapshot = await getDocs(emailMatch);
    const emailArray = emailSnapshot.docs.map((doc) => doc.data());
    const passwordMatch = query(
      dbref,
      where("Password", "==", inputs.password)
    );
    const passwordSnapshot = await getDocs(passwordMatch);
    const passwordArray = passwordSnapshot.docs.map((doc) => doc.data());

    if (emailArray.length > 0 && passwordArray.length > 0) {
      setSuccess("Login successful.");
      cookies.set("auth-token", inputs.email);
      navigate("/Dashboard");
    } else {
      setSuccess("Wrong email or password.");
    }

    // try {
    //   await axios.post(
    //     "http://localhost:8800/api/controller/auth/login",
    //     inputs
    //   );
    //   navigate("/Dashboard");
    //   setSuccess("Login successful.");
    // } catch (err) {
    //   console.log(err.response.status);
    //   setSuccess("Wrong email or password!");
    // }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    setSuccess(null);

    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.email);
      setIsAuth(true);
      await setDoc(doc(db, "Auth", result.user.uid), {
        Name: result.user.displayName,
        Username: result.user.displayName,
        Email: result.user.email,
        UID: result.user.uid,
      });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(err);

  // Delete
  const [showPassword, setShowPassword] = React.useState(false);

  // // Input
  // const [userName, setUserName] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // //   const handleUsername = (event) => {};

  // // Input error
  // const [usernameError, setUsernameError] = React.useState(false);
  // const [passwordError, setPasswordError] = React.useState(false);

  // // Form validity
  // const [formValid, setFormValid] = React.useState();
  // const [success, setSuccess] = React.useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handlePassword = () => {
  //   if (!password || password.length < 6 || password.length > 20) {
  //     setPasswordError(true);
  //     return;
  //   }

  //   setPasswordError(false);
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

  //   // If Password error is true
  //   if (passwordError || !password) {
  //     setFormValid(
  //       "Password is set btw 6 - 20 characters long. Please Re-Enter."
  //     );
  //     return;
  //   }

  //   setFormValid(null);
  //   // Proceed to use the information passed
  //   console.log("Username : " + userName);
  //   console.log("Password : " + password);

  //   //Show Successfull Submittion
  //   setSuccess("Form Submitted Successfully");
  // };

  if (!isAuth) {
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#53A2BE",
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
              sx={{ padding: "20px", margin: "10px", fontFamily: "Calistoga" }}
            >
              Welcome Back!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="email" sx={{ fontFamily: "Calistoga" }}>
                  Email
                </FormLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder=""
                  required
                  onChange={handleChange}
                  // value={userName}
                  // onChange={(event) => {
                  //   setUserName(event.target.value);
                  // }}
                  sx={{ backgroundColor: "white", width: "100%" }}
                />
              </FormGrid>
            </Box>
            <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="password" sx={{ fontFamily: "Calistoga" }}>
                  Password
                </FormLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  autoComplete="password"
                  placeholder=""
                  required
                  onChange={handleChange}
                  // value={password}
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
            <Box
              sx={{
                display: "flex",
                width: "100%",
                padding: "10px",
                justifyContent: "center",
              }}
            >
              {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                const credentialResponseDecoded = jwtDecode(
                  credentialResponse.credential
                );
                console.log(credentialResponseDecoded);
                navigate("/Dashboard");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}

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
                onClick={googleLogin}
              >
                Sign in with Google
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <FormControlLabel
                control={<Checkbox name="saveInfo" />}
                label="Remember me"
              />
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
              onClick={handleLogin}
            >
              Login
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
                <Alert severity="error" size="small">
                  {success}
                </Alert>
              </Stack>
            )}
            <Grid item xs>
              <Typography sx={{ fontFamily: "Calistoga" }}>
                <Link to="/PasswordReset">Forgot Password?</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontFamily: "Calistoga" }}>
                Don't have an account?
                <Link to="/Register"> Register here</Link>
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return <Navigate to={"/Dashboard"} />;
}
