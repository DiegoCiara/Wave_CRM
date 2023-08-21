import { experimentalStyled as styled } from "@material-ui/core/styles";
import StaticLink from "./LinkNext";

export const LinkStyled = styled(StaticLink)`
  display: flex;
  text-decoration: none;
  height: 35px;
  position: relative;
  border-radius: 10px;
  .linkMUI {
    text-decoration: none;
    display: flex;
    align-items: center;
    position: relative;
  }
`;

export const RecoveryPassLink = styled("a")`
  color: ${({ theme }) => theme.palette.grey[100]};
  transition: color 0.4s;

  &:hover {
    color: ${({ theme }) => theme.palette.grey[100]};
  }
`;
