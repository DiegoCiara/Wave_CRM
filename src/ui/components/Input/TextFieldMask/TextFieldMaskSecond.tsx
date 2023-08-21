import React from "react";
import  TextField from "../TextField/TextField";
import {
  Icon,
  InputAdornment,
  StandardTextFieldProps,
} from "@material-ui/core";
import { InputContainer } from "./TextFieldMask.style";

export interface TextFieldTitleProps extends StandardTextFieldProps {
  mask?: string;
  icon?: string;
  maxLength?: number; // Adicionando a propriedade maxLength
}

const TextFieldTitle: React.FC<TextFieldTitleProps> = ({
  mask,
  icon,
  value,
  onChange,
  maxLength,
  ...props
}) => {
  return (
    <InputContainer>
      <TextField
        value={value}
        onChange={onChange}
        {...props}
        inputProps={{ maxLength: 45  }} // Usando inputProps para definir maxLength
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon
                className={icon}
                color={props.error ? "error" : "disabled"}
                fontSize="small"
              />
            </InputAdornment>
          ),
        }}
      />
    </InputContainer>
  );
};

export default TextFieldTitle;
