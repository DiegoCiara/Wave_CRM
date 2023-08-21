import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import {
  CompanyPictureStyled,
  CompanyCardContainer,
  CompanyCityStyled,
  CompanyNameStyled,
  CompanyEmailStyled,
} from "./AutomationCard.style";
import { BsFilter } from "react-icons/bs";

interface FunnelCardProps {
  name: string;
  description: string;
  onClick: any;
}

const FunnelCard: React.FC<FunnelCardProps> = (props) => {
  return (
    <>
      <CompanyCardContainer onClick={props.onClick}>
        <CompanyPictureStyled>
          <BsFilter style={{color: "#0000FF", fontSize:"25px"}}/> 
        </CompanyPictureStyled>
        <CompanyNameStyled>{getNameUpperCase(props.name)}</CompanyNameStyled>
        <CompanyCityStyled>
           {props.description}
        </CompanyCityStyled>
      </CompanyCardContainer>
    </>
  );
};
export default FunnelCard;
