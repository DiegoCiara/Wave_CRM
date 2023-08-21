import React from "react";
import { HeaderAppBar, HeaderLogo } from "./Header.style";
import { Toolbar, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

const Header: React.FC = () => {
  return (
    <HeaderAppBar position={"sticky"}>
      <Toolbar component={Container}>
        <HeaderLogo src={"logo.svg"} alt={"Wave"} />
      </Toolbar>
    </HeaderAppBar>
  );
};

export default Header;
