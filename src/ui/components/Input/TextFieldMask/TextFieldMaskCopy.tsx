import React from "react";
import TextField from "../TextField/TextField";
import {
  Icon,
  InputAdornment,
  StandardTextFieldProps,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { InputContainer } from "./TextFieldMask.style";
import { LinkPhoneStyled } from "ui/components/DealDetailCard/DealDetailCard.style";
import { CopyToClipboard } from "react-copy-to-clipboard";

export interface TextFieldMaskCopyProps extends StandardTextFieldProps {
  mask?: string;
  icon?: string;
  copy?: string;
}

const TextFieldMaskCopy: React.FC<TextFieldMaskCopyProps> = ({
  mask,
  icon,
  value,
  copy,
  onChange,
  ...props
}) => {
  return (
    <InputContainer>
      <TextField
        value={value}
        onChange={onChange}
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon
                className={icon}
                color={props.error ? "error" : "disabled"}
                fontSize="small"
              />
              <LinkPhoneStyled>
                <Tooltip
                  title="Copiar"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <IconButton type="submit" aria-label="search">
                    <CopyToClipboard text={copy}>
                      <i className={`fa fa-clone`} style={{fontSize:"18px"}}></i>
                    </CopyToClipboard>
                  </IconButton>
                </Tooltip>
              </LinkPhoneStyled>

            </InputAdornment>
          ),
        }}
      />
    </InputContainer>
  );
};

export default TextFieldMaskCopy;
