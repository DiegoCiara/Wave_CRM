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
} from "./FunnelDetailCard.style";
import { CompanyTypes } from "types/Company";
import theme from "ui/theme/theme";
import { mockEstados } from "data/utils/mock";
import { AutomatiionTypes } from "types/Automation";
import { useMailerPage } from "data/services/hooks/PageHooks/MailerHook";
import { TwoColumnsContainer } from "../Modal/ModalStyles/ModalContainer.style";
import { SubtitleStyled } from "../Title/Title.style";
import { Funnel } from "types/Funnel";
import TextFieldTitle from "../Input/TextFieldMask/TextFieldMaskSecond";

interface FunnelDetailCardProps {
  id: string;
  name: string;
  description: string;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;
}

const DealDetailCard: React.FC<FunnelDetailCardProps> = (props) => {
  const [data, setData] = useState<Funnel>({
    name: props.name,
    description: props.description,
  });
  const {
    mailers,
  } = useMailerPage();
  const {
    pipelines,
  } = useContext(PipelineContext);

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
        <InputContainer>
          <TextFieldTitle
            disabled={!props.hasEdit}
            label={"Nome"}
            fullWidth
            size="small"
            value={data.name}
            onChange={(event) => setData({ ...data, name: event.target.value })}
            error={!data.name}
          />
        </InputContainer>
        <InputContainer>
          <TextFieldTitle
            disabled={!props.hasEdit}
            label={"Descrição"}
            fullWidth
            multiline
            value={data.description}
            onChange={(event) => setData({ ...data, description: event.target.value })}
            error={!data.description}
          />
        </InputContainer>
        <div/>
      </CompanyDetailCardContainer>
    </div>
  );
};
export default DealDetailCard;
