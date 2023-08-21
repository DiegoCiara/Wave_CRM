import { Avatar, Card } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const DealCardContainer = styled(Card)`
  display: grid;
  grid-template-columns: 28px 1fr 15px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(0.5)};
  margin: ${({ theme }) => theme.spacing(1)} 0;
  /* border: 0.1px solid #0015ff; */
  box-shadow: 0px 2px 6px rgba(1, 1, 37, 0.213);
`;

export const DealPictureStyled = styled("div")`
  width: 10px;
  height: initial;
  aspect-ratio: 1;
  border-radius: 20px;
  font-size: 16px;
  display: flex;
  padding-right: 0.2%;
`;

export const DealDescriptionContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

export const DealTitleStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: 600;
`;

export const DealBudgetStyled = styled("div")`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const DealFooterContainer = styled("div")`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const DealTypeStyled = styled("div")`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const DealStartDateStyled = styled("div")`
  text-align: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 12px;
`;

export const ColumnContainer = styled("div")`
  min-height: 515px;
  position: relative !important;
  display: grid;
  grid-template-columns:270px;
  grid-template-rows: 100px 1fr;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 6px;
  border: 1px solid rgba(175, 170, 170, 0.304);
  box-shadow: 5px 4px 8px rgba(175, 170, 170, 0.349);
  padding: ${({ theme }) => theme.spacing(1)};
  margin-bottom: 5px;
`;

export const ColumnHeader = styled("div")`
  text-transform: uppercase;
  margin-bottom: 0px;
`;

export const DroppableStyles = styled("div")`
  padding: 10px;
  border-radius: 6px;
  /* background: ${({ theme }) => theme.palette.grey[100]}; */
`;

export const TitleColumnContainer = styled("div")`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;

export const ListGrid = styled("div")`
  display: flex;
  max-width: calc(100vw - 75px);
  gap: ${({ theme }) => theme.spacing(2)};
  overflow: auto;
  padding: 0 20px;
  gap: 10px;
::-webkit-scrollbar {
  display: flex;
}

  ${({ theme }) => theme.breakpoints.down("md")} {
    max-width: calc(100%);
  }
`;
