import { Button, Link, Paper } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const DealDetailCardContainer = styled("div")`
  max-width: 90vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e2e2;
  position: relative;
  overflow: auto;

  ${({ theme }) => theme.breakpoints.down("md")} { 
    grid-template-columns: 1fr;
  }
`;

export const ActionsDealDetailCardContainer = styled("div")`
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  // grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(2)};
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e2e2;
  position: relative;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr;
  }
`;

export const NewActivityContainer = styled("div")`
  max-width: 90vw;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(1) + " " + theme.spacing(2)};
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e2e2;
  position: relative;
  margin-top: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down("md")} {
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

  &.deal-value-responsible {
    ${({ theme }) => theme.breakpoints.down("md")} {
      margin-top: ${({ theme }) => theme.spacing(2)};
    }
  }
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

export const NewActivityButton = styled(Button)`
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  top: -20px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    top: -16px;
    font-size: 12px;
  }
`;
export const NewActivityButtonLabel = styled("label")`
  ${({ theme }) => theme.breakpoints.down("md")} {
  }
`;

export const LinkPhoneStyled = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
`;

export const WhatsAppLink = styled("a")`
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
`;
