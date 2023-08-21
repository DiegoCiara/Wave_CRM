import { experimentalStyled as styled } from "@material-ui/core/styles";

export const CompletedPageContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100vw;
  }
`;

export const CompletedHeaderContainer = styled("div")`
  display: grid;
  width: 95%;
  padding-top: ${({ theme }) => theme.spacing(4)};
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.up("md")} {
    
  padding-top: ${({ theme }) => theme.spacing(0)};
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CompletedButtonsContainer = styled("div")`
  display: flex;
  border: 1px solid #ededed;

  width: 30%;
  background-color: #ffffff;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing(0)} 0
    ${({ theme }) => theme.spacing(1)} 0;

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CardsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 0;
`;

export const TitleContainer = styled("div")`
  ${({ theme }) => theme.breakpoints.up("md")} {
    margin-right: auto;
  }
`;
