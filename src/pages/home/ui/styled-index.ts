import { Button, Typography } from "@mui/material";
import styled from "styled-components";

export const TopBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 10px 0;
`;

export const Heading = styled(Typography)`
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const Span = styled(Typography)`
  color: #009cff;
  padding-left: 10px;
`;

export const CreateButton = styled(Button)`
  background: white !important;
  color: #009cff  !important;
  padding: 10px 20px !important;
  text-transform: none !important;
  border-radius: 7px !important;
`;

export const CardList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GridWrapper = styled.div`
  overflow-y: auto;
  padding: 20px;
  box-shadow: 2px 2px 11px -3px rgba(0,0,0,1);
-webkit-box-shadow: 2px 2px 11px -3px rgba(0,0,0,1);
-moz-box-shadow: 2px 2px 11px -3px rgba(0,0,0,1);
border-radius: 10px;
`;

export const NoData = styled.div`
  width: 100% !important;
  height: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
`;
