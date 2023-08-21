import React from "react";
import Link from "next/link";
import { Typography } from "@material-ui/core";
import { RecoveryPassLink } from "./Link.style";
import { SubtitleStyled } from "../Title/Title.style";

export interface LinkComponentProps {
  href?: string;
  text?: string;
  query?: {};
  textColor?: string;
}

const CustomLink: React.FC<LinkComponentProps> = (props) => {
  return (
    <RecoveryPassLink href="" >
      <Link
        href={{
          pathname: props.href,
          query: props.query,
        }}
      >
        <Typography variant="body2" sx={{ my: 2 }}><span style={{color: "#0048FF"}}>
          {props.text}
        </span>
        </Typography>
      </Link>
    </RecoveryPassLink>
  );
};

export default CustomLink;
