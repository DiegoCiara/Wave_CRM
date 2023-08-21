import React, { useEffect, useState } from "react";
import { Button, Typography, CircularProgress } from "@material-ui/core";
import Title from "ui/components/Title/Title";
import {
  FormContainer,
  LoginContainer,
  LoginRightContainer,
} from "@styles/pagesStyle/login.styles";
import CustomLink from "ui/components/Link/Link";

import TextFieldMaskLogin from "ui/components/Input/TextFieldLogin/TextFieldMaskLogin";
import { ImageContainer } from "ui/components/Welcome/welcome.style";
import Head from "next/head";
import { useLoginPage } from "data/services/hooks/PageHooks/loginPageHook";
import { GetServerSideProps } from "next";
import { parseCookies } from "../data/services/cookie/index";
import { Random } from "ui/components/Welcome/Random";
import { SubtitleStyled, TitleStyled, TitleStyledMin } from "ui/components/Title/Title.style";

function HomePage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    hasError,
    emailIsValid,
    passwordIsValid,
    login,
    passwordVerification,
    emailVerification,
  } = useLoginPage();

  return (
    <>
          <Head>
        <title>Login | Wave CRM</title>
      </Head>
    <LoginContainer>
      <LoginRightContainer style={{backgroundColor:"#fafafa"}}>        
        <div style={{ margin: "0" , backgroundColor: "#ffff", padding: "5%", borderRadius:"8px",border:"1px solid #ededed", boxShadow: "0px 4px 4px rgba(0, 0, 0, 8%)"}}>

          {/* <hr /> */}
          <ImageContainer>
            <img
              src="logo.png"
              alt="logo"
              height="75px"
              width="auto"
              text-align="center"
              justify-content="center"
              align-items="center"
            />
          </ImageContainer>
          <br />

          <Title
            title={""}
            subtitle={<h3 style={{fontWeight: 500}}>Acesse sua conta</h3>}
            subtitleColor="#4f4f4f"
          ></Title>

          <FormContainer>
            {hasError ? (
              <Typography
                sx={{ maxWidth: "280px" }}
                variant="caption"
                color="error"
              >
                <i className="fa fa-info-circle" /> {hasError}
              </Typography>
            ) : (
              ""
            )}
            <TextFieldMaskLogin
              label={"E-mail"}
              fullWidth
              icon="fa fa-envelope"
              size="medium"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={emailVerification}
              error={!emailIsValid}
              helperText={!emailIsValid ? "Formato inválido" : ""}
            />
            <TextFieldMaskLogin
              fullWidth
              label={"Senha"}
              icon="fa fa-unlock-alt"
              type="password"
              size="medium"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={passwordVerification}
              error={!passwordIsValid}
              helperText={
                !passwordIsValid ? "Deve ter no mínimo 6 caracteres" : ""
              }
            />
            <Button
              variant="contained"
              sx={{ width: "275px", mt: 3 }}
              size="large"
              color="primary"
              onClick={(event) => {
                event.preventDefault();
                login(email, password);
              }}
              type="submit"
            >
              {isLoading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                "Entrar"
              )}
            </Button>
            <CustomLink
              href="/recover_pass"
              text="Esqueceu a senha? Clique aqui"
              textColor="#ddd"
            />
          </FormContainer>
        </div>
      </LoginRightContainer>
      <div className="MobileNone" style={{display: "flex", flexDirection:"column", justifyContent:"center", width:"60vw", alignItems:"center", gap:"25px", backgroundColor:"#0048fc"}}>
        <div style={{width:"80%"}}>
          
        <h1 style={{color:"#ffff", lineHeight:"5px"}}>Explore o que há de melhor no CRM</h1>
        <SubtitleStyled style={{color:"#ffff"}}>Melhore a experiência do seu cliente e impulsione o crescimento do seu negócio.</SubtitleStyled>
        </div>
        <div style={{display:"flex", justifyContent:"space-around", height:"400px", width:"80%", backgroundColor:"#ffff", borderRadius:"10px", alignItems:"center", boxShadow:"2px 4px 8px 4px rgba(0, 0, 0, .1)", borderColor: "#716f6f;", border:"1px"}}>

        <Random/>

        </div>
      </div>

    </LoginContainer>

    </>
  );
}
export default HomePage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
}): Promise<any> => {
  const data = parseCookies(req);
  let token: string = "";
  let user: any = {};

  Object.keys(data).find((key, i) => {
    if (key === "@target:token") {
      token = Object.values(data)[i];
    }
    if (key === "@target:user") {
      user = Object.values(data)[i];
    }
  });
  if (token?.length && user?.length && resolvedUrl !== "/") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
      token,
    },
  };
};