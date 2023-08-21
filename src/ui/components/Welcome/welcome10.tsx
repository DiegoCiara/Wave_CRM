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
        title={"Envie e-mails de boas vindas para seus clientes:"}
        subtitle={<p>No plano Anual você tem acesso ao recurso de enviar e-mails <br/>para seus clientes ao cadastra-lo no Wave.</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/Email.svg"
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
