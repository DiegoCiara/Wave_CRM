import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Select,
} from "@material-ui/core";

export const PaperStyled = styled("div")`
  position: relative;
  display: grid;
  grid-template-columns: 20px 1fr 20px 100px;
  align-items: center;
  height: 60px;
  margin: auto 0;
  margin-left: auto;
  gap: 2px;
  width: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.palette.grey[100]}
    ${({ theme }) => theme.breakpoints.up("md")} {
    width: 400px;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
margin-top: 20px;
  }
`;

export const InputBaseStyled = styled(InputBase)`
  margin-left: theme.spacing(1);
  padding: 20px;
  flex: 1;
  max-height: 50px;
  height: 50px;
`;

export const DividerStyled = styled(Divider)`
  height: 28;
  margin: 4;
`;

export const IconButtonStyled = styled(IconButton)`
  padding: 10;
`;

export const HasFilter = styled("div")`
  display: flex;
  position: absolute;
  top: ${({ theme }) => theme.spacing(7)};
  align-items: center;
  left: 0;
  padding: 2px 10px;
  border-radius: 10px;
  width: auto;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  cursor: pointer;
`;
