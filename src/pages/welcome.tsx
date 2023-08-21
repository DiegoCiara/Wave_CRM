import React, { useContext, useEffect, useState } from "react";
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
import { Validator } from 'data/validator'
import Payment from "./Payment";
import Onboarding from "ui/components/Welcome/Onboarding/Onboarding";
import Welcomes from "ui/components/Welcome/welcome";
import Slides from "ui/components/Welcome/Slides";
import OnboardingChange from "ui/components/Welcome/Onboarding";

interface WelcomeProps {
  user: IUser;
}

const Welcome = ({ user }: WelcomeProps) => {
  const { loged, setUser } = useContext(AuthContext);

  useEffect(() => {
    setUser(user);
  }, []);

  const [isAdplent, setIsAdplent] = useState(false);

  useEffect(() =>{
    setIsAdplent(Validator)
  })

  return (

    <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around", height:"100vh"}}>
    {isAdplent ? (
          <Payment />
        ):(
        <div style={{ margin: "auto 0"}}>
          <Head>
            <title>Seja bem vindo | Wave CRM</title>
          </Head>
          

          <ImageContainer>
            <OnboardingChange/>
          </ImageContainer>
        </div>

        )}
    
    </div>
  );
};
export default Welcome;

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
