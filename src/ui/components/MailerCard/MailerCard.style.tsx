import { Avatar } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const CompanyCardContainer = styled("div")`
  display: grid;
  width: 100%;
  
  grid-template-columns: 60px 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "picture name"
    "picture city"
    "picture email"; 
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
  margin: 0 auto;  
  background-color:#ffffff98;
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
    grid-template-columns: 60px repeat(3, 1fr);
    grid-template-areas: "picture name city email ";
  }
`;

export const CompanyNameStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: bold;
  grid-area: name;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const CompanyCityStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: city;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const CompanyPictureStyled = styled("div")`
  display: flex;
  align-items: center;
  grid-area: picture;
  /* aspect-ratio: 1; */
  /* overflow-x: hidden; */
  /* text-overflow: ellipsis; */
  
`;

export const CompanyEmailStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  grid-area: email;
  overflow-x: hidden;
  text-overflow: ellipsis;
  height: 18px
`;
