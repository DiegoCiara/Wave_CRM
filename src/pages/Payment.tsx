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
import TitlePay from "ui/components/Title/TitlePay";
import { FaWhatsapp } from "react-icons/fa";


const Payment = () => {
  return (
    <div>
      <Head>
        <title>Acesso expirado | Wave CRM</title>
      </Head>
      <ImageContainer>
        <img
          src="payment.svg"
          alt="Seja bem vindo!"
          height="300 px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />
        
      <TitlePay
        title={"Seu acesso expirou"}
        subtitle={<p>Escolha um plano e conclua o pagamento para liberar seu acesso,<br/>ou fale conosco para te ajudarmos a escolher.</p>}
      ></TitlePay>

      <div style={{ margin: "auto 0", marginTop: "20px" }}>
          <a
            href='https://wavecrm.com.br/planos'
          >
            <Button
              variant="contained"
              sx={{ width: "200px", mt: 0 }}
              color="primary"
            >
              Escolher um plano
            </Button>
          </a>
        </div>

          <div style={{ margin: "auto 0", marginTop: "5px"  }}>     
        <a
            target="_blank"
            href='https://api.whatsapp.com/send/?phone=5581997052688&text=Olá,%20gostaria%20de%20ajuda%20para%20escolher%20meu%20plano.&type=phone_number&app_absent=0'
          >
            <Button
              sx={{ width: "200px", mt: 1, fontSize:"16px", gap: '5px' }}
              color="success"
            >
              <FaWhatsapp/>
              Fale conosco
            </Button>
          </a>
        </div>
      </ImageContainer>
    </div>
  );
};
export default Payment;

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
  if (!token?.length && resolvedUrl !== "/login") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    try {
      serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await serviceApi.get("/auth/faw1efawe3f14aw8es3v6awer51xx3/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  if (user) {
    user = JSON.parse(user);
  }
  return {
    props: {
      user,
      token,
    },
  };
};
