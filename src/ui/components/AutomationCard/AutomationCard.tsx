import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import {
  CompanyPictureStyled,
  CompanyCardContainer,
  CompanyCityStyled,
  CompanyNameStyled,
  CompanyEmailStyled,
} from "./AutomationCard.style";
import { BiGitPullRequest } from "react-icons/bi";

interface AutomationCardProps {
  name: string;
  input: string; 
  output?: string;
  onClick: any;
}

const AutomationCard: React.FC<AutomationCardProps> = (props) => {
  return (
    <>
      <CompanyCardContainer onClick={props.onClick}>
        <CompanyPictureStyled>
          <BiGitPullRequest style={{color: "#6c01b4", fontSize:"18px"}}/>
        </CompanyPictureStyled>
        <CompanyNameStyled>{getNameUpperCase(props.name)}</CompanyNameStyled>
        <CompanyCityStyled>
           {props.input}
        </CompanyCityStyled>
        <CompanyEmailStyled>{props.output || "Não Possui"}</CompanyEmailStyled>
      </CompanyCardContainer>
    </>
  );
};
export default AutomationCard;
