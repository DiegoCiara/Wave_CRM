import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "./welcome.style";

const Welcome5 = () => {
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
        title={"Crie canais de vendas"}
        subtitle={<p>Os canais de vendas ajudam a segmentar seus clientes<br/> para você saber de onde eles vieram.</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/Canais.svg"
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
export default Welcome5;
