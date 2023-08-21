import React from "react";
import { TitleContainer, SubtitleStyled, TitleStyledPay } from "./Title.style";

interface TitlePayProps {
  title: string;
  subtitle?: string | JSX.Element;
  style?: any;
  subtitleColor?: string;
}

const TitlePay: React.FC<TitlePayProps> = (props) => {
  return (
    <TitleContainer>
      <TitleStyledPay title={props.title} style={props.style}>{props.title}</TitleStyledPay>
      <SubtitleStyled style={{ color: props.subtitleColor }}>
        {props.subtitle}
      </SubtitleStyled>
    </TitleContainer>
  );
};

export default TitlePay;
