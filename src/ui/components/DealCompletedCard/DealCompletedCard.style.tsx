import { Avatar, Card } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const DealCardContainer = styled(Card)`
  cursor: pointer;
  display: grid;
  grid-template-columns: 30px 1fr 15px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(0.2) + " " + theme.spacing(0.5)};
  margin: ${({ theme }) => theme.spacing(0)} 0;
  border: 1px solid #ededed;
  background-color:#ffffff98;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(24, 22, 20, 8%);
  transition: .1s;
  &:hover{
  background-color: #ffff;
  scale: 100.5%;
  transition: .1s;
  } 
  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 50px;
    grid-template-columns: 60px 1fr 60px;
  }
`;

export const DealPictureStyled = styled("div")`
  /* width: 10px;
  height: 10px; */
  display: flex;
  /* background-color: ${({ theme }) => theme.palette.primary.main}; */
  align-items: center;
  aspect-ratio: 1;
  font-size: 16px;
  border-radius: 16px;
  ${({ theme }) => theme.breakpoints.up("md")} {
    /* width: 10px; 
    height: 10px; */
  }
`;

export const DealDescriptionContainer = styled("div")`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  text-overflow: ellipsis;

  gap: ${({ theme }) => theme.spacing(0.5)};

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 95%;
    /* gap: 4px; */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const DealTitleStyled = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: 600;
  overflow-x: hidden;
  text-overflow: ellipsis;
  
  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 50%;
  }
`;

export const DealBudgetStyled = styled("div")`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.secondary};
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const DealFooterContainer = styled("div")`
  display: flex;
  width: 100%;
  justify-content: space-between;
  overflow-x: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 40%;
  }
`;

export const DealTypeStyled = styled("div")`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  overflow-x: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 50%;
  }
`;

// export const DealStartDateStyled = styled("div")`
//   text-align: center;
//   color: ${({ theme }) => theme.palette.text.secondary};
//   font-size: 12px;
//   overflow-x: hidden;
//   text-overflow: ellipsis;  
// @media (max-width: 850px) {
//   display: none;
// }
// `;
export const DealEndDateStyled = styled("div")`
  text-align: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 12px;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ColumnContainer = styled("div")`
  min-height: 450px;
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 100px 1fr;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 6px;
  box-shadow: 6px 8px rgba(175, 170, 170, 0.08);
  padding: ${({ theme }) => theme.spacing(1)};
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ColumnHeader = styled("div")`
  text-transform: uppercase;
  margin-bottom: 20px;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const DroppableStyles = styled("div")`
  padding: 10px;
  border-radius: 6px;
  background: ${({ theme }) => theme.palette.grey[100]};
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const TitleColumnContainer = styled("div")`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ListGrid = styled("div")`
  display: flex;
  max-width: calc(100vw - 120px);
  gap: ${({ theme }) => theme.spacing(4)};
  overflow: auto;
  overflow-x: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.breakpoints.down("md")} {
    max-width: calc(100%);
  }
`;
