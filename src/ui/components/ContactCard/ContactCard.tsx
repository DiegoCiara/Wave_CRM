import { formatPhone } from "data/utils/formatPhone";
import { getNameInitials, getNameUpperCase } from "data/utils/nameConfig";
import React from "react";
import {
  ContactPictureStyled,
  ContactCardContainer,
  ContactCityStyled,
  ContactNameStyled,
  ContactPhoneStyled,
  ContactCompanyStyled,
  ContactCpfCnpjStyled,
  ContactEmailStyled,
  ContactWeitghtStyled,
} from "./ContactCard.style";
import { FaUserCircle, FaIdCard } from "react-icons/fa";

interface ContactCardProps {
  picture?: string;
  name: string;
  cpf_cnpj:string;
  phone: string;
  email: string;
  onClick: () => void;
}

const CompanyCard: React.FC<ContactCardProps> = (props) => {
  return (
    <ContactCardContainer onClick={() => props.onClick()}>
      <ContactPictureStyled >
        <FaUserCircle style={{color:"#414eff", fontSize:"18px"}}/>
      </ContactPictureStyled>
      <ContactNameStyled>{getNameUpperCase(props.name)}</ContactNameStyled>
      <ContactCpfCnpjStyled> {props.cpf_cnpj}</ContactCpfCnpjStyled>
      <ContactPhoneStyled>
        {formatPhone(props.phone) || "Não Possui"}
      </ContactPhoneStyled>      
      <ContactEmailStyled> {props.email}</ContactEmailStyled>
    </ContactCardContainer>
  );
};
export default CompanyCard;