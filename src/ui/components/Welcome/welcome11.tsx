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
        title={"Suas informações em um lugar seguro"}
        subtitle={<p>As informacões do seu negócio e de seus clientes ficam armazenadas em nuvem.</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/seguro.svg"
          alt="welcome"
          height="180px"
          width="auto"
          style={{margin:"20px"}}
          text-align="center"
          justify-content="center"
          align-items="center"
        />
      </ImageContainer>
    </div>
  );
};
export default Welcome9 
