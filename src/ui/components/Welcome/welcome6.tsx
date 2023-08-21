import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "./welcome.style";

const Welcome6 = () => {
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
        title={"Sem limites de usuários"}
        subtitle={<p>No plano Company você cadastra toda sua equipe, sem limites de usuários</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/Usuarios.svg"
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
export default Welcome6;
