import React, { useState } from "react";
import { Box, Container, Typography, TextField } from "@mui/material";
import { Wrapper, StyledLink, Form, ContentWrapper, FormFooter, CustomButton } from "../../signup/ui/styled-index";
import { FormWrapper } from "./styled-index";
import { Login } from "../model/api";
import CustomizedSnackbars from "../../../components/snackbar";
// import { useNavigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
  const [secret, setSecret] = useState<string>("")
  const [key, setKey] = useState<string>("")
  // const navigate = useNavigate()
  const [openSnak, setOpenSnak] = useState<boolean>(false);
  console.log(openSnak);
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await Login(secret, key)
      if (response.isOk === true) {
        window.location.replace("/")
      }
    } catch (error) {
      setOpenSnak(true)
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
              <Typography variant="h4" fontWeight="bold">Sign In</Typography>
              <Box component={Form} onSubmit={handleSignIn} noValidate autoComplete="on">
                <TextField
                  required
                  sx={{ width: "100%", borderRadius: "10px" }}
                  id="outlined-basic"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => setKey(e.currentTarget.value)}
                />
                <TextField
                  required
                  sx={{ width: "100%", borderRadius: "10px", fontSize: "12px" }}
                  id="outlined-basic"
                  label="Sercet key"
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => setSecret(e.currentTarget.value)}
                />
                <CustomButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={!key || !secret}
                >
                  Button
                </CustomButton>
              </Box>
              <Box
                component={FormFooter}
              >
                <Typography variant="body1">
                  Are you not registered? <StyledLink to="/signup">Go to sign up.</StyledLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Wrapper>
      <CustomizedSnackbars
        openSnak={openSnak}
        setOpenSnak={setOpenSnak}
        isError={true}
        message={"password or Secret key error !"}
      />
    </>
  )
};
