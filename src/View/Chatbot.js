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
import { Link } from "react-router-dom";
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

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Chatbot() {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDMd1u72JRH-_T6Fc_8BZP_SOtLo6yNLS4",
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] },
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  };

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
          height: "479px",
          width: "479px",
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
          <Typography component="h1" variant="h5" padding="20px" margin="10px">
            Chatbot
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          ></Box>
          <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="password">Input</FormLabel>
              <OutlinedInput
                placeholder=""
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{ backgroundColor: "white", width: "100%" }}
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
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>

          <Box sx={{ display: "flex", width: "100%", padding: "10px" }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="password">Output</FormLabel>
              {/* {answer} */}
              <OutlinedInput
                value={answer}
                sx={{ backgroundColor: "white", width: "100%" }}
              />
            </FormGrid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
