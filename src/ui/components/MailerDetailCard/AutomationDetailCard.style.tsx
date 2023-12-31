import { Button, Paper } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const CompanyDetailCardContainer = styled("div")`
 width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(4)} 0;
  padding-bottom: 2px;
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
  border-radius: 8px;
  position: relative;
  overflow: auto;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr;
  }
`;

export const EditButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const InputContainer = styled("div")`
  overflow: hidden;
  width: 100%;
`;

export const PaperDealDetailModalStyled = styled(Paper)`
  position: relative;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  height: 40px;
  margin: auto 0;
  margin-left: auto;
  background-color: ${({ theme }) => theme.palette.grey[100]}
    ${({ theme }) => theme.breakpoints.up("md")} {
    width: 400px;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-top: 20px;
  }
`;
