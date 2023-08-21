import { experimentalStyled as styled } from "@material-ui/core/styles";

export const TitleContainer = styled("div")`
  text-align: center;
  margin: ${({ theme }) => theme.spacing(1)} 0;
  overflow: hidden;
  margin-bottom: 0;
  padding-bottom: 0;
  white-space: nowrap;
`;

export const TitleStyled = styled("h2")`
  margin: 0;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
  }
`;
export const TitleStyledPay = styled("h2")`
  margin: 0;
  color: ${({ theme }) => theme.palette.error.main};
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
  }
`;

export const TitleStyledHeadSec = styled("h3")`
  margin: 0;
  color: gray;
  font-size: 20px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 150px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
  }
`;
export const TitleStyledMin = styled("h3")`
  margin: 0;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
  }
`;

export const TitleStyledSec = styled("h2")`
  margin: 0;
  margin-top: 20px;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  /* background-color: ${({ theme }) => theme.palette.text.disabled}; */
  border-radius: 11px;
  padding: 5px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
  }
`;


export const SubtitleStyled = styled("h3")`
  margin: ${({ theme }) => theme.spacing(1.5)} 0;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: normal;
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
  }
`;
