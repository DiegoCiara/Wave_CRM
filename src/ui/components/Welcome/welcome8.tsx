import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "./welcome.style";

const Welcome8 = () => {
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
        title={"Dúvidas e Suporte"}
        subtitle={<p>Tire suas dúvidas pelo nosso Suporte via WhatsApp</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/suporte.svg"
          alt="welcome"
          height="180px"
          width="auto"
          text-align="center"
          justify-content="center"
          style={{margin:"20px"}}
          align-items="center"
        />
      </ImageContainer>
    </div>
  );
};
export default Welcome8;
