import React, { useState, useEffect } from 'react';
import { Button } from "@material-ui/core";
import { LinkPhoneStyled } from '../DealDetailCard/DealDetailCard.style';
import Title from '../Title/Title';
import { ImageContainer } from './welcome.style';
import Link from 'next/dist/client/link';


const Slide = ({ title, content, image }) => {
    return (
    <div style={{ margin: "auto"}}>

      <Title
        title={title}
        subtitle={content}
      ></Title>

      <ImageContainer>
        <img
          src={image}
          alt="welcome"
          height="250px"
          width="auto"
          text-align="center"
          justify-content="center"
          align-items="center"
        />
      </ImageContainer>
      </div>
    );
  };


export default Slide;
