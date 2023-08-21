 import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "./welcome.style";

const Welcome3 = () => {
  return (
    <div style={{ margin: "auto"}}>

      {/* <ImageContainer>
        <img
          src="logo.png"
          alt="logo"
          height="75px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />
      </ImageContainer> */}


      <Title
        title={"Facilidade para sua equipe"}
        subtitle={<p>Seus vendedores podem criar suas próprias negociações<br/>e oportunidades de maneira simples, de qualquer lugar!</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/Facilite.svg"
          alt="welcome"
          style={{margin:"20px"}}
          height="180px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />
      </ImageContainer>
    </div>
  );
};
export default Welcome3;
