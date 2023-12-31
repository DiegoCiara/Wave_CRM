import React from "react";
import { experimentalStyled as styled } from "@material-ui/core/styles";

export const ModalContainer = styled("div")`
  position: relative;
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: auto;
  padding: ${({ theme }) => theme.spacing(3) + " " + theme.spacing(3)};
  border-radius: 5px;
  overflow: auto;
  overflow-x: hidden;
  min-width: 50vw;
  max-height: 95vh;
  max-width: 97vw;
  row-gap: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.up("md")} {
    width: auto;
    max-width: 70%;
  }
`;
export const TwoColumnsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr;
    row-gap: ${({ theme }) => theme.spacing(1)};
  }
`;

export const ThreeColumnsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr;
  }
`;
