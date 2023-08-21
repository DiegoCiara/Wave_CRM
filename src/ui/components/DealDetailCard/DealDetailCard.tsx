import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Tooltip,
  InputLabel,
} from "@material-ui/core";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { formatCurrency, formatValue } from "data/utils/formatValue";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DealCard from "../DealComponents/DealCard/DealCard";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import {
  DealDetailCardContainer,
  EditButton,
  InputContainer,
} from "./DealDetailCard.style";
import ContactContext from "contexts/ContactContext";
import PipelineContext from "contexts/PipelineContext";
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";
import TextFieldMaskCopy from "../Input/TextFieldMask/TextFieldMaskCopy";


interface DealDetailCardProps {
  company: any;
  contact: any;
  name: string;
  value: string;
  status: string;
  pipeline: any;
  currentResponsible: string;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;
}

const DealDetailCard: React.FC<DealDetailCardProps> = (props) => {
  const [prevData, setPrevData] = useState(props);
  const { formatCompaniesToSelect } = useCompanyPage();
  const [contactsThisCompany, setContactsThisCompany] = useState([]);
  const [selectedContact, setSelectedContact] = useState(props.contact);
  const [selectedCompany, setSelectedCompany] = useState(props.company);
  const [isInitialValue, setInitialValue] = useState(true);
  const [selectedId, setSelectedId] = useState<string>("");

  const [value, setValue] = useState(
    formatCurrency(formatValue(Number(props.value)))
  );
  const [name, setName] = useState(props.name);
  const [pipeline, setPipeline] = useState(props.pipeline);
  const [submited, setSubmited] = useState(false);


  useEffect(() => {
    if (!prevData?.name) setPrevData(props);
  }, [props]);

  const handleSubmit = () => {
    setSubmited(true);
    const data = {
      company: selectedCompany.value,
      contact: selectedContact.value,
      name,
      value,
      pipeline: pipeline.value,
    };
    if (
      value &&
      data.company.length &&
      data.contact !== "default" &&
      name.length
    ) {
      setSubmited(false);
      props.saveEdit(data);
    } else {
      toast.warning(
        "Preenchimento invalido, verifique os campos e tente novamente."
      );
    }
  };
  return (
    <DealDetailCardContainer>
      {!props.hasEdit ? (
        <Tooltip
          title="Editar"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <EditButton
            style={{
              right: props.hasEdit ? "80px" : 0,
            }}
            onClick={() => {
              if (prevData?.name && !props.hasEdit) {
                setName(prevData?.name);
                setValue(formatCurrency(formatValue(Number(prevData?.value))));
                setSelectedCompany(prevData?.company);
                setSelectedContact(prevData?.contact);
                setPipeline(prevData?.pipeline);
              }
              setTimeout(() => {
                props.onClick();
              }, 1000);
            }}
          >
            {!props.hasEdit ? "Editar" : "Cancelar"}
            <i
              style={{ marginLeft: "2px" }}
              className={`fa fa-${!props.hasEdit ? "pencil" : "times"}`}
              aria-hidden="true"
            ></i>
          </EditButton>
        </Tooltip>
      ) : (
        <Tooltip
          title="Cancelar"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <EditButton
            style={{ right: props.hasEdit ? "80px" : 0 }}
            onClick={props.onClick}
            color={props.hasEdit ? "error" : "primary"}
          >
            {!props.hasEdit ? "Editar" : "Cancelar"}
            <i
              style={{ marginLeft: "2px" }}
              className={`fa fa-${!props.hasEdit ? "pencil" : "times"}`}
              aria-hidden="true"
            ></i>
          </EditButton>
        </Tooltip>
      )}

      <Tooltip
        title="Salvar alterações"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <EditButton
          style={{
            display: props.hasEdit ? "inline" : "none",
          }}
          onClick={handleSubmit}
          color={props.hasEdit ? "success" : "primary"}
        >
          {"Salvar"}
          <i
            style={{ marginLeft: "2px" }}
            className="fa fa-check"
            aria-hidden="true"
          ></i>
        </EditButton>
      </Tooltip>
      <InputContainer>
        <FormControl fullWidth sx={{ mt: !name && submited ? 6 : 3 }}>
          <TextFieldMask
            disabled={!props.hasEdit}
            label={"Nome da negociação"}
            size="small"
            fullWidth
            required            
            value={name}
            sx={{ mt: 1, backgroundColor:'#fff' }}
            onChange={(event) => setName(event.target.value)}
            error={!name && submited}
          />
        </FormControl>
      </InputContainer>
      <FormControl sx={{ mt: 3 }}>
        <InputLabel
          error={submited && !selectedCompany.value}
          required
          disabled={!props.hasEdit}
        >Canal</InputLabel>
        <Select
          disabled={!props.hasEdit}
          sx={{backgroundColor:'#fff'}}
          size="small"
          onChange={(event) => {
            setSelectedCompany({ value: event.target.value });
          }}
          value={selectedCompany.value}
          label="Canal*"
          fullWidth
        >
          {formatCompaniesToSelect.map((company) => (
            <MenuItem key={company.value} value={company.value}>
              {company.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <InputContainer
        style={{ marginBottom: "-23px" }}
        className="deal-value-responsible"
      >
        <TextFieldMaskCopy
          disabled={!props.hasEdit}
          label={"Valor"}
          fullWidth
          required
          size="small"
          sx={{backgroundColor:'#fff'}}
          value={value}
          onChange={(event) => setValue(formatCurrency(event.target.value))}
          error={!value && submited}
          copy={value}
        />
      </InputContainer>
      <InputContainer
        className="deal-value-responsible"
      >
        <TextFieldMaskCopy
          disabled
          label={"Contato"}
          fullWidth
          required
          size="small"
          value={selectedContact.value}
          onChange={(event) => setValue(formatCurrency(event.target.value))}
          error={!value && submited}
          copy={selectedContact.value}
        />
      </InputContainer>

      {/* <FormControl className="DetailMargin"
      >       
        <InputLabel
          error={submited && selectedContact.value === "default"}
          disabled
        >
          Contato
        </InputLabel>
        <Select
          disabled
          onChange={(event) => {
            setSelectedContact({ value: event.target.value });
          }}
          label="Contato"
          size="small"
          value={selectedContact.value}
          fullWidth
          error={submited && selectedContact.value === "default"}
        >
          {contactsThisCompany.length && !isInitialValue ? (
            contactsThisCompany.map((contact) => (
              <MenuItem key={contact.id} value={contact.id}>
                {contact.name}
              </MenuItem>
            ))
          ) : !contactsThisCompany.length && !isInitialValue ? (
            <MenuItem value="default">Canal sem contatos</MenuItem>
          ) : (
            <MenuItem key={selectedContact.value} value={selectedContact.value}>
              {selectedContact.label}
            </MenuItem>
          )}
        </Select>
      </FormControl> */}


      <InputContainer className="deal-value-responsible">
        <TextFieldMask
          disabled
          label={"Responsável"}
          fullWidth
          size="small"
          value={props.currentResponsible}
        />
      </InputContainer>
     
      <InputContainer className="deal-value-responsible">
        <TextFieldMask
          disabled
          label={"Status"}
          size="small"
          fullWidth
          value={"Em andamento"}
        />
      </InputContainer>    
      {/* <EditButton
      onClick={() => useUpdateContactModal()}
      >Visualizar</EditButton> */}
      
    </DealDetailCardContainer>  
  );
};
export default DealDetailCard;
