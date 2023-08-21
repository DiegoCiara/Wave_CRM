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
import { FaAddressCard, FaIdCard } from "react-icons/fa";
import { formatCurrency } from "data/utils/formatValue";

interface ProductCardProps {
  picture?: string;
  name: string;
  description:string;
  value: any;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  return (
    <ContactCardContainer onClick={() => props.onClick()}>
      <ContactPictureStyled >
        <FaAddressCard style={{color:"#414eff", fontSize:"20px"}}/>
      </ContactPictureStyled>
      <ContactNameStyled>{getNameUpperCase(props.name)}</ContactNameStyled>
      <ContactCpfCnpjStyled> {props.description}</ContactCpfCnpjStyled>
      <ContactPhoneStyled>
        {formatCurrency(props.value)}
      </ContactPhoneStyled>      
      {/* <ContactEmailStyled> {props.email}</ContactEmailStyled> */}
    </ContactCardContainer>
  );
};
export default ProductCard;