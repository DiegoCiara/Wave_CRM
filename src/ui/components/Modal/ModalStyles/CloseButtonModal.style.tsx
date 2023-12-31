import { Button } from "@material-ui/core";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const CloseButtonStyled = styled(Button)`
  position: absolute;
  color: ${({ theme }) => theme.palette.text.primary};
  top: ${({ theme }) => theme.spacing(1.2)};
  right: 0;
  font-size: 25px;
`;
