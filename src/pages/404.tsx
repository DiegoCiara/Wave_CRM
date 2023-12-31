import React, { useContext, useEffect } from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "ui/components/Welcome/welcome.style";
import { Button } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import AuthContext from "contexts/AuthContext";
import { IUser } from "types/User";
import { GetStaticProps } from "next";

interface WelcomeProps {
  user: IUser;
}

const NotFoundError = ({ user }: WelcomeProps) => {
  const { loged, setUser } = useContext(AuthContext);

  useEffect(() => {
    setUser(user);
  }, []);

  return (
    <div style={{ margin: "auto 0", marginTop: "100px" }}>
      <Head>
        <title>404 not found | Wave CRM</title>
      </Head>

      <Title
        title={"Ops, onde estamos?"}
        subtitle={<p>Parece que esse lugar não é visitado a séculos!</p>}
      ></Title>

      <ImageContainer>
        <img
          src="404.svg"
          alt="Seja bem vindo!"
          height="300 px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />

        <p> Deixe-me te ajudar a voltar para tela inicial</p>
        <div style={{ margin: "auto 0", marginTop: "10px" }}>
          <Link
            href={{
              pathname: "/",
              query: { loged },
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "200px", mt: 1 }}
              color="primary"
            >
              Ir para página inicial
            </Button>
          </Link>
        </div>
      </ImageContainer>
    </div>
  );
};
export default NotFoundError;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24 * 7, // 7 dias
  };
};
