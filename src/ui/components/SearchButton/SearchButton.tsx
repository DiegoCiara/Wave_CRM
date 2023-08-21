import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import TextFieldMask from "ui/components/Input/TextFieldMask/TextFieldMask";
import { DividerStyled, HasFilter, PaperStyled } from "./SearchButton.style";
import { FaTimes } from "react-icons/fa";
import TextFieldMaskSearch from "../Input/TextFieldMask/TextFieldMasKSearch";

interface SearchButtomProps {
  placeholder: string;
  buttomIcon: string;
  searchTypes: any[];
  viewButtonGroup: boolean;
  ChangeType: any;
  typeValue: string | number;
  value: string;
  onChange: any;
  selectListValues?: any[];
  hasFiltered: boolean;
  onClick: any;
}

const SearchButtom: React.FC<SearchButtomProps> = (props) => {
  useEffect(() => {}, [props.typeValue]);

  return (
    <PaperStyled
    >
      <i
        style={{ marginTop: "10px", marginRight: "5px", fontSize: "20px" }}
        aria-label=""
      ></i>
      {props.typeValue === "name" || props.typeValue === "contact" || props.typeValue === "cpf" || props.typeValue === "nb" ? (
        <TextFieldMaskSearch
          label={`Pesquisar...`}
          fullWidth
          placeholder="pesquisar"
          size="small"
          value={props.value}
          onChange={props.onChange}
          sx={{ minWidth: "150px", backgroundColor:'#fff'}}
        />
      ) : (
        <FormControl fullWidth style={{minWidth:"150px"}}>
          <InputLabel  htmlFor="uncontrolled-native" sx={{mt:"-7px"}}>
            Selecione um valor
          </InputLabel>

          <Select
            sx={{backgroundColor:'#fff',minWidth:"110px"}}
            fullWidth
            size="small"
            value={props.value}
            onChange={props.onChange}
          >
            {props.selectListValues.map((type, index) => (
              <MenuItem key={index} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FormControl fullWidth style={{width:"110px"}}>
        <InputLabel  htmlFor="uncontrolled-native">
          Tipo do filtro
        </InputLabel>
        <Select
            sx={{backgroundColor:'#fff'}}
          size="small"
          label="Tipo do filtro"
          value={props.typeValue}
          onChange={props.ChangeType}
          
        >
          {props.searchTypes.map((type, index) => (
            <MenuItem key={index} value={type.value}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {props.hasFiltered ? (
        <HasFilter onClick={props.onClick}>
          <div style={{display:"flex", alignItems:"center"}}>
          <FaTimes />
          </div>
          <Typography variant="caption" sx={{ fontWeight: "bold"}}>
            Remover filtro
          </Typography>
        </HasFilter>
      ) : (
        null
      )}
    </PaperStyled>
  );
};

export default SearchButtom;
