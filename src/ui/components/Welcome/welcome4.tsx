import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "./welcome.style";

const Welcome4 = () => {
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
        title={"Organização e Produtividade"}
        subtitle={<p>Ganhe mais tempo e produtividade organizando suas vendas e clientes</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/Organize.svg"
          alt="welcome"
          height="180px"
          style={{margin:"20px"}}
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />
      </ImageContainer>
    </div>
  );
};
export default Welcome4;
