import React, { useState } from "react";
import { Box, Container, Typography, TextField } from "@mui/material";
import { Wrapper, StyledLink, Form, ContentWrapper, FormWrapper, FormFooter, CustomButton } from "./styled-index";
import { UserCreate } from "../model/api";

export const SignUp: React.FC = () => {

  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [secretKey, setSecretKey] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateuser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const body = {
        name: userName,
        email: email,
        key: password,
        secret: secretKey
      }
      const response = await UserCreate(body)
      if (response.isOk === true) {
        window.location.replace("/")
      }
    } catch (error) {
      error
      const storedError = localStorage.getItem("errorResponse");
      if (storedError && error) {
        const errorResponse = JSON.parse(storedError);
        setErrorMessage(errorResponse.message);
      }
    }

  }

  return (
    <>
      <Wrapper>
        <Container maxWidth="lg">
          <Box
            component={ContentWrapper}
          >
            <Box
              component={FormWrapper}
              sx={{ boxShadow: 3 }}
            >
              <Typography variant="h4" fontWeight="bold">Sign Up</Typography>
              <Box component={Form} onSubmit={handleCreateuser} noValidate autoComplete="on">
                <TextField
                  required
                  sx={{ width: "100%", borderRadius: "10px" }}
                  id="outlined-basic"
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => setUserName(e.currentTarget.value)}
                />
                <TextField
                  required
                  sx={{ width: "100%", borderRadius: "10px" }}
                  id="outlined-basic"
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <TextField
                  error={Boolean(errorMessage)}
                  required
                  sx={{ width: "100%", borderRadius: "10px", fontSize: "12px" }}
                  id="outlined-basic"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  helperText={errorMessage}
                />
                <TextField
                  required
                  sx={{ width: "100%", borderRadius: 10 }}
                  id="outlined-basic"
                  label="Secret key"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => setSecretKey(e.currentTarget.value)}
                />
                <CustomButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={!userName || !email || !password || !secretKey}
                >
                  Submit
                </CustomButton>
              </Box>
              <Box
                component={FormFooter}
              >
                <Typography variant="body1">
                  Already signed up? <StyledLink to="/signin">Go to sign in.</StyledLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Wrapper>
    </>
  )
};
