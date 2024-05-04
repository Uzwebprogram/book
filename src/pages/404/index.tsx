import React from "react";
import { Wrapper } from "../signup/ui/styled-index";
import { Box, Container } from "@mui/material";
import { NotFoundWrapper, Image, BtnGroup, OutlineButton, ContainedButton } from "./styled-index";

import NotFoundImg from "../../assets/notfound.png";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate()
  return (
    <>
      <Wrapper>
        <Container maxWidth="lg">
          <Box component={NotFoundWrapper}>
            <Box component="div">
              <Image src={NotFoundImg} alt="" />
              <Box component={BtnGroup}>
                <ContainedButton
                  onClick={() => navigate("/")}
                  variant="contained"
                >
                  Go Home Page
                </ContainedButton>
                <OutlineButton
                  onClick={() => window.location.reload()}
                  variant="outlined"
                >
                  Reload Page
                </OutlineButton>
              </Box>
            </Box>
          </Box>
        </Container>
      </Wrapper>
    </>
  );
};

export default NotFound;
