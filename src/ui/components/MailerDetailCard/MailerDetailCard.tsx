import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Tooltip,
  InputLabel,
} from "@material-ui/core";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import React, { useContext, useState } from "react";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import PipelineContext from "contexts/PipelineContext";
import {
  CompanyDetailCardContainer,
  EditButton,
  InputContainer,
} from "./AutomationDetailCard.style";
import { CompanyTypes } from "types/Company";
import theme from "ui/theme/theme";
import { mockEstados } from "data/utils/mock";
import { AutomatiionTypes } from "types/Automation";
import { useMailerPage } from "data/services/hooks/PageHooks/MailerHook";
import { TwoColumnsContainer } from "../Modal/ModalStyles/ModalContainer.style";
import { SubtitleStyled } from "../Title/Title.style";
import { MailerTypes } from "types/Mailer";
import TextArea from "../Input/TextFieldMask/TextArea";
import TextFieldMaskMensage from "../Input/TextFieldMask/TextArea";
import TextFieldMailer from "../Input/TextFieldMask/TextFieldMaskSecond";
import TextFieldTitle from "../Input/TextFieldMask/TextFieldMaskSecond";

interface MailerDetailCardProps {
  id: string;
  subject: string;
  title: string;
  text: string;
  template: string;
  color: string;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;
  isAdmin: any;
}

const DealDetailCard: React.FC<MailerDetailCardProps> = (props, isAdmin) => {
  const [data, setData] = useState<MailerTypes>({
    subject: props.subject,
    title: props.title,
    text: props.text,
    template: props.template,
    color:props.color,
  });
  // const {
  //   mailers,
  // } = useMailerPage();
  // const {
  //   pipelines,
  // } = useContext(PipelineContext);

  return (
    <div>
      <Typography
        sx={{
          position: "relative",
          top: "20px",
          left: "15px",
          zIndex: 1,
          display: "none",
        }}
        color="error"
        variant="caption"
      >
        <i className="fa fa-info-circle" /> Formulario incompleto
      </Typography>
      <CompanyDetailCardContainer>
        {!props.hasEdit ? (
          <Tooltip
            title="Editar"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <EditButton
              style={{ right: props.hasEdit ? "80px" : 0 }}
              onClick={props.onClick}
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
            onClick={() => props.saveEdit(data)}
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
      <TwoColumnsContainer>
        <InputContainer>
          <TextFieldTitle
            disabled={!props.hasEdit}
            label={"Assunto"}
            fullWidth
            size="small"
            value={data.subject}
            onChange={(event) => setData({ ...data, subject: event.target.value })}
            error={!data.subject}
          />
        </InputContainer>
        <FormControl fullWidth>
          <InputLabel htmlFor="uncontrolled-native">
            Tipo de e-mail
          </InputLabel>

          <Select
            size="small"
            value={data.template}
            onChange={(event) => setData({ ...data, template: event.target.value })}
            disabled={!props.hasEdit}
            label="Tipo de e-mail"
            fullWidth
          >
          <MenuItem value={"null"} disabled>
            Selecione o tipo de e-mail
          </MenuItem>
            <MenuItem value={"Empresarial"} disabled={!props.isAdmin ? true : false}>
              Empresarial
            </MenuItem>
            <MenuItem value={"Pessoal"} >
              Pessoal
            </MenuItem>
          </Select>

          </FormControl >


      </TwoColumnsContainer>
      <FormControl fullWidth>
      <InputContainer>
          <TextFieldTitle
            disabled={!props.hasEdit}
            label={"Título"}
            fullWidth
            size="small"
            value={data.title}
            onChange={(event) => setData({ ...data, title: event.target.value })}
            error={!data.title}
          />
        </InputContainer>
      </FormControl>
        <FormControl sx={{ mt: 0 }}  fullWidth>
        <InputContainer>
        <TextFieldMask
                multiline
                disabled={!props.hasEdit}
                label={"Mensagem"}
                // variant={"standard"}
                size="medium"
                required
                value={data.text}
                onChange={(event) => setData({ ...data, text: event.target.value })}
                error={!data.text}
                rows={3}
              />
        </InputContainer>
        </FormControl>
          <div style={{display:"flex",gap:"10px"}} >
          <input 
            disabled={!props.hasEdit}
            type="color" 
            onChange={(event) => setData({ ...data, color: event.target.value })}
            value={data.color}
            />
            <InputLabel 
            disabled={!props.hasEdit}>
            Escolha a cor de fundo do e-mail
            </InputLabel>
        </div>
    
      </CompanyDetailCardContainer>
    </div>
  );
};
export default DealDetailCard;
