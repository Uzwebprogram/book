import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalWrapper, } from "./styled-global";
import { CircularProgress } from "@mui/material";
const Home = lazy(() => import("./pages/home/index"))
const SignUp = lazy(() => import("./pages/signup/index"))
const SignIn = lazy(() => import("./pages/signin/index"))
const NotFound = lazy(() => import("./pages/404/index"))
const LoaderComponent: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", zIndex: "9999", background: "#fff" }}>
      <CircularProgress />
    </div>
  );
};



const App: React.FC = () => {
  const userData = localStorage.getItem("userData");
  return (
    <GlobalWrapper>
      <BrowserRouter>
        <Suspense fallback={
          <LoaderComponent />
        }>
          <Routes>
            <Route path="/" element={userData ? <Home /> : <Navigate to="/signup" replace />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </GlobalWrapper>
  );
};

export default App;
