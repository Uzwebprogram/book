import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const Wrapper = styled.div`
  height: 100dvh;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled.div`
  width: 450px;
  height: 518px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 30px;
  background: #fefefe;
`;

export const FormFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const CustomButton = styled(Button)`
  padding: 10px 15px !important;
  margin-top: 20px !important;
  border-radius: 7px !important;
  background: #1976d2 !important;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6200ee;
`;

export const Form = styled.form`
  width: 100%;
`;
