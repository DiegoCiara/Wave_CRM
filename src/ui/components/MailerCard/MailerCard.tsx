import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import {
  CompanyPictureStyled,
  CompanyCardContainer,
  CompanyCityStyled,
  CompanyNameStyled,
  CompanyEmailStyled,
} from "./MailerCard.style";
import { MdEmail, MdMail } from "react-icons/md";

interface MailerCardProps {
  subject: string;
  title: string;
  text?: string;
  onClick: any;
}

const MailerCard: React.FC<MailerCardProps> = (props) => {
  return (
    <>
      <CompanyCardContainer onClick={props.onClick}>
        <CompanyPictureStyled>
          <MdEmail style={{color:"#0048fc", fontSize:"20px"}}/>
        </CompanyPictureStyled>
        <CompanyNameStyled>{getNameUpperCase(props.subject)}</CompanyNameStyled>
        <CompanyCityStyled>
           {props.title}
        </CompanyCityStyled>
        <CompanyEmailStyled>{props.text || "Não Possui"}</CompanyEmailStyled>
      </CompanyCardContainer>
    </>
  );
};
export default MailerCard;
