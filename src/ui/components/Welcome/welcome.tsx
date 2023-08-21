import React, { useContext, useEffect } from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "ui/components/Welcome/welcome.style";
import { Button } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import AuthContext from "contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";
import { IUser } from "types/User";

const Welcomes = () => {
  return (
    <div style={{ margin: "auto 0"}}>
      <Head>
        <title>Seja bem vindo | Wave CRM</title>
      </Head>

      <Title
        title={"Seja bem-vindo(a)!"}
        subtitle={<p>Acesse a aplicação e vamos trabalhar!</p>}
      ></Title>

      <ImageContainer>
        <img
          src="welcome.svg"
          alt="Seja bem vindo!"
          height="300px"
          width="auto"
          text-align="center"
          style={{marginTop:"20px"}}
          justify-content="center"
          align-items="center"
        />

        <div style={{ margin: "auto 0", marginTop: "50px" }}>
          <Link
            href={{
              pathname: "/",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "200px", mt: 1 }}
              color="primary"
            >
              Acessar a aplicação
            </Button>
          </Link>
        </div>
      </ImageContainer>
    </div>
  );
};
export default Welcomes;
