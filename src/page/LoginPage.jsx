import React from "react";
import SignInForm from "../components/SignInForm/SignInForm";
import Header from "../components/SellerRole/UtilsComponent/Header/Header";
import { LoggedInUserProvider } from "../context/LoggedInUserContext";

const LoginPage = () => {
  return (
    <>
      <Header />
      <SignInForm />
    </>
  );
};

export default LoginPage;
