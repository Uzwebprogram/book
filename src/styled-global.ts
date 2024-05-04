import styled from "styled-components";
import bgImg from "./assets/bg-img.png";

export const GlobalWrapper = styled.div`
  background-image: url(${bgImg});
  background-position: left center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100dvh;
  width: 100%;
`;

export const Loader = styled.div`
  width: 100% !important;
  height: 100dvh !important;
  z-index: 1000 !important;
  background-color: red !important;
`;
