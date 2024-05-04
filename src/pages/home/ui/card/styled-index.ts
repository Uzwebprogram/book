import { Button } from "@mui/material";
import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px !important;
  padding: 10px !important;
`;

export const BookLink = styled.a`
  color: #01a4ff !important;
  text-decoration: none !important;
`;

export const CardFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 10px 0;
`;

export const Text = styled.p`
  padding: 2px 6px !important;
  color: #fff;
  border-radius: 7px;
  font-weight: bold !important;
`;

export const BtnAction = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Delete = styled(Button)`
  background: #ff4d4f !important;
  padding: 6px !important;
  font-size: 16px;
  text-transform: capitalize !important;
`;

export const Edit = styled(Button)`
  background: #6200ee !important;
  padding: 6px !important;
`;
export const DeleteText = styled.h4`
  font-weight: bold !important;
  margin-bottom: 15px !important;
`;

