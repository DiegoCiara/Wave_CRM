import { experimentalStyled as styled } from "@material-ui/core/styles";

export const DealsPageContainer = styled("div")`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing(0)};

  /* overflow: hidden; */
  ${({ theme }) => theme.breakpoints.down("md")} {
    
  padding-top: ${({ theme }) => theme.spacing(5)};

    width: 100vw;
  }
`;

export const DealsHeaderContainer = styled("div")`
  display: grid;
  width: 95%;
  padding: ${({ theme }) => theme.spacing(1)};
  padding-bottom: 0;

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }
`;

export const TitleHeaderContainer = styled("div")`
  ${({ theme }) => theme.breakpoints.up("md")} {
    margin-right: auto;
    width: 100%;
  }
`;

export const DealsTotalTagsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 160px;
  margin: 0 auto;
  gap: 8px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const PipelinesContainer = styled("div")`
  /* position: relative !important; */
  width: 100%;
  margin: 0;
  padding: 0;
  /* border-radius: 0px;
   background-color: ${({ theme }) => theme.palette.grey[100]}; */
   background-color: transparent;
`;
