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
import { AiOutlineSearch } from "react-icons/ai";

export interface TextFieldMaskSearchProps extends StandardTextFieldProps {
  mask?: string;
  icon?: string;
  info?: string;
}

const TextFieldMaskSearch: React.FC<TextFieldMaskSearchProps> = ({
  mask,
  icon,
  value,
  info,
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
          <Tooltip
          title={info}
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <div
            // variant="contained"
            color="primary"
            style={{marginTop: 5, cursor:"auto", alignItems:"center", position:"relative", fontSize:"20px"}}
          >
            <AiOutlineSearch/>
          </div>
        </Tooltip>


              {/* <Icon
                className={icon}
                color={props.error ? "error" : "disabled"}
                fontSize="small"
              /> */}
            </InputAdornment>
          ),
        }}
      />
    </InputContainer>
  );
};

export default TextFieldMaskSearch;
