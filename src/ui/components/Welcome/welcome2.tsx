import React from "react";
import Title from "ui/components/Title/Title";
import { ImageContainer } from "./welcome.style";

const Welcome2 = () => {
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
        title={"Números e inteligência"}
        subtitle={<p>Visualize todos os números da sua equipe e seu desempenho nos DashBoards</p>}
      ></Title>

      <ImageContainer>
        <img
          src="LoginSlides/NumeroseInteligencia.svg"
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
export default Welcome2;
