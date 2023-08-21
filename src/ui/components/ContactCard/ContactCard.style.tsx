import { Avatar } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const ContactCardContainer = styled("div")`
  cursor: pointer;
  display: grid;
  width: 100%;
  grid-template-columns: 60px 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "picture name"
    "picture cpf_cnpj" 
    "picture phone"    
    "picture email";
  background-color:#ffffff98;
  padding: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
  margin: 0 auto;
  border: 1px solid #ededed; 
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(24, 22, 20, 8%);
  transition: .1s;
  &:hover{
  background-color: #ffff;
  scale: 100.5%;
  transition: .1s;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    display: grid;
    width: 100%;
    height: 50px;
    grid-template-columns: 60px repeat(4, 1fr);
    grid-template-rows: repeat(1, auto);
    grid-template-areas: "picture name cpf_cnpj phone email";
  }
`;

export const ContactNameStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: bold;
  grid-area: name;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ContactCpfCnpjStyled = styled("div")`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: cpf_cnpj;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ContactEmailStyled = styled("div")`  
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: email;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;
export const ContactWeitghtStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: bold;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;


export const ContactCityStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: city;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ContactPictureStyled = styled("div")`
  grid-area: picture;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.primary.dark};
  background-color: transparent;
  aspect-ratio: 1;
  font-size: 0px;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ContactPhoneStyled = styled("div")`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: phone;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ContactCompanyStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: company;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;
