import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "./welcome.style";

const Welcome9 = () => {
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
        title={"Colete informações essenciais"}
        subtitle={<p>Obtenha as informações que você precisa do seu cliente no Plano personalizado.</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/Colete.svg"
          alt="welcome"
          height="180px"
          width="auto"
          text-align="center"
          style={{margin:"20px"}}
          justify-content="center"
          align-items="center"
        />
      </ImageContainer>
    </div>
  );
};
export default Welcome9 
