import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "./welcome.style";

const Welcome1 = () => {
  return (
    <div style={{ margin: "auto",  width: "60vw"}}>

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
        title={"Melhores vendas, mais faturamento!"}
        subtitle={<p>Empresas que utilizam CRM aumentam seu faturamento<br/>com a organização e inteligência em seus processos de vendas</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/Vendamelhor.svg"
          alt="welcome"
          style={{margin:"20px"}}
          height="180px" 
          width="auto"
        />
      </ImageContainer>
    </div>
  );
};
export default Welcome1;
