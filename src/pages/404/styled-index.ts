import { Button } from "@mui/material";
import styled from "styled-components";

export const NotFoundWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 100%;
  height: 400px;
`;

export const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
`;

export const OutlineButton = styled(Button)`
  width: 48%;
  color: #6200ee !important;
  font-weight: bold !important;
  border: 2px solid #6200ee !important;
`;
export const ContainedButton = styled(Button)`
  width: 48%;
  background: #6200ee !important;
  font-weight: bold;
`;
