import React from "react";
import TextField from "../TextField/TextField";
import {
  Icon,
  InputAdornment,
  Button,
  Tooltip,
  StandardTextFieldProps,
} from "@material-ui/core";
import { InputContainer } from "./TextFieldMask.style";
import { FaInfoCircle } from "react-icons/fa";

export interface TextFieldMaskMensageProps extends StandardTextFieldProps {
  mask?: string;
  icon?: string;
  info?: string;
}

const TextFieldMaskMensage: React.FC<TextFieldMaskMensageProps> = ({
  mask,
  icon,
  value,
  info,
  onChange,
  ...props
}) => {
  return (
    <InputContainer style={{height:"auto"}}>
      <TextField
       style={{height:"auto"}}
        value={value}
        onChange={onChange}
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{minHeight:"60px"}} >
            </InputAdornment>
          ),
        }}
      />
    </InputContainer>
  );
};

export default TextFieldMaskMensage;