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
import React, { useContext, useEffect, useState } from "react";
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
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";
import TextFieldTitle from "../Input/TextFieldMask/TextFieldMaskSecond";

interface AutomationDetailCardProps {
  id: string;
  name: string;
  input: string;
  condition: string;
  action: string;
  output: string;
  hasEdit: boolean;
  onClick: any;
  saveEdit: any;
}

const DealDetailCard: React.FC<AutomationDetailCardProps> = (props) => {
  const [data, setData] = useState<AutomatiionTypes>({
    name: props.name,
    input: props.input,
    action: props.action,
    condition: props.condition,
    output: props.output,
  });
  const {
    mailers,
  } = useMailerPage();
  const {
    pipelines,
    dealsList, 
  } = useContext(PipelineContext);
  const [selectedPipelineFunnelId, setSelectedPipelineFunnelId] = useState('');

  const [selectedPipelineName, setSelectedPipelineName] = useState('');
  const [selectedFunnelId, setSelectedFunnelId] = useState('');
  
  const {funnels} = useFunnelPage()


  const handleFunnelIdChange = (event) => {
    setSelectedFunnelId(event.target.value);
  };

  const filteredPipelines = Object.values(dealsList).filter((listKey) => {
    if (selectedFunnelId !== '') {
      const pipeline = pipelines.find((p) => p.id === listKey.id);
      return pipeline.funnel.id === selectedFunnelId;
    } else {
      return listKey.name === selectedPipelineName || selectedPipelineName === '';
    }
  });
  useEffect(() => {
    if (funnels.length > 0) {
      const pipeline = pipelines.find((p) => p.id === data.condition);
      setSelectedFunnelId(pipeline?.funnel?.id || '');
    }
  }, [data.condition, funnels, pipelines]);
  


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
        
        <div/>

        <div style={{display: "flex", flexDirection:"column", gap:"5px", height:"auto", border:"1px solid #e2e2e2", padding:"15px", borderRadius:"5px", backgroundColor:"#FAFAFA"}}>
    <SubtitleStyled style={{ fontWeight:500, margin:"5px", color:"#757575"}}>Ações da automação</SubtitleStyled>

    <FormControl sx={{ mt: 3 }} fullWidth>
  <InputLabel htmlFor="uncontrolled-native" sx={{ mt: "-7px" }}>
    Gatilho
  </InputLabel>
  <Select
    sx={{ backgroundColor: "#fff", width: "100%" }}
    size="small"
    label="Gatilho"
    disabled={!props.hasEdit}
    value={data.input}
    onChange={(event) => {
      setData({ ...data, input: event.target.value });
    }}
  >
    <MenuItem value={null} disabled>
      Selecione um gatilho
    </MenuItem>
    <MenuItem value={"Criar contato"}>Criar contato</MenuItem>
    <MenuItem value={"Follow up"}>Follow up (Mover negociação)</MenuItem>
    <MenuItem value={"Alterar status de negociação"}>
      Alterar status de negociação
    </MenuItem>
  </Select>
</FormControl>

{/* Componente que aparecerá quando nenhuma das três verificações for atendida */}
{data.input !== "Follow up" && data.input !== "Criar contato" && data.input !== "Alterar status de negociação" && (
  <InputContainer sx={{ mt: 1 }} >
    <TextFieldTitle
      label={"Selecione um gatilho"}
      fullWidth
      size="small"
      style={{ backgroundColor: "#fff" }}
      value={data.input}
      disabled
      onChange={(event) => setData({ ...data, input: event.target.value })}
    />
  </InputContainer>
)}

{/* Componente que aparecerá quando a condição for 'Follow up' */}
{data.input === "Follow up" && (
  <TwoColumnsContainer>
    <FormControl sx={{ mt: 3 }} fullWidth>
      <InputLabel htmlFor="uncontrolled-native" sx={{ mt: "-7px" }}>
        Funil de atuação
      </InputLabel>
      <Select
        sx={{ backgroundColor: "#fff", width: "100%" }}
        size="small"
        disabled={!props.hasEdit}
        label="Funil de atuação"
        value={selectedFunnelId}
        onChange={handleFunnelIdChange}
      >
        <MenuItem value={null} disabled>
          Selecione um funil
        </MenuItem>
        {funnels.map((index) => (
          <MenuItem key={index.id} value={index.id}>
            {index.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl sx={{ mt: 3 }} fullWidth>
      <InputLabel sx={{ mt: "-7px" }} required>
        Ao mover negociação para
      </InputLabel>
      <Select
        style={{ backgroundColor: "#fff" }}
        disabled={!props.hasEdit}
        value={data.condition}
        onChange={(event) => {
          setData({ ...data, condition: event.target.value });
        }}
        label="Ao mover negociação para"
        size="small"
        fullWidth
        required
      >
        <MenuItem value={"null"} disabled>
          Selecione um pipeline
        </MenuItem>
        {filteredPipelines.map((pipeline) => (
          <MenuItem key={pipeline.id} value={pipeline.id}>
            {pipeline.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </TwoColumnsContainer>
)}

{/* Componente que aparecerá quando a condição for 'Criar contato' */}
{data.input === "Criar contato" && (
  <FormControl sx={{ mt: 3 }} fullWidth>
    <InputLabel sx={{ mt: "-7px" }} required>
      Tipo de contato
    </InputLabel>
    <Select
      disabled={!props.hasEdit}
      style={{ backgroundColor: "#fff" }}
      value={data.condition}
      onChange={(event) => {
        setData({ ...data, condition: event.target.value });
      }}
      label="Tipo de contato"
      size="small"
      fullWidth
      required
    >
      <MenuItem value={"null"} disabled>
        Selecione um pipeline
      </MenuItem>
      <MenuItem value={"Qualquer contato"}>Qualquer contato</MenuItem>
    </Select>
  </FormControl>
)}

{/* Componente que aparecerá quando a condição for 'Alterar status de negociação' */}
{data.input === "Alterar status de negociação" && (
  <FormControl sx={{ mt: 3 }} fullWidth>
    <InputLabel sx={{ mt: "-7px" }} required>
      Alterar status para
    </InputLabel>
    <Select
      style={{ backgroundColor: "#fff" }}
      value={data.condition}
      disabled={!props.hasEdit}
      onChange={(event) => {
        setData({ ...data, condition: event.target.value });
      }}
      label="Alterar status para"
      size="small"
      fullWidth
      required
    >
    <MenuItem value={"WON"}>Convertida</MenuItem>
    <MenuItem value={"LOST"}>Perdida</MenuItem>
    <MenuItem value={"ARCHIVED"}>Arquivada</MenuItem>
    </Select>
  </FormControl>
)}


    <FormControl sx={{ mt: 3 }} fullWidth>             
        <InputLabel  htmlFor="uncontrolled-native" sx={{mt:"-7px"}}>
          Ação
        </InputLabel>
        <Select
          sx={{backgroundColor:'#fff', width:"100%"}}
          size="small"
          disabled={!props.hasEdit}
          label="Ação"
          value={data.action}
          onChange={(event) => {
            setData({ ...data, action: event.target.value });
            // setSelectPipeline(formatListThisCompanyToSelect(event.target.value));
              }}
        >
        <MenuItem value={null} disabled>Selecione uma ação</MenuItem>
          <MenuItem value={"Enviar e-mail"}>Enviar e-mail</MenuItem>
          {data.input === "Criar contato"?(
          // <MenuItem value={"Criar negociação"}>Criar negociação</MenuItem>
          null
          ):(
          <MenuItem value={"Registrar atividade"}>Registrar atividade</MenuItem>)}
        </Select>                
      </FormControl>          

{/* Componente que aparecerá quando nenhuma das três verificações for atendida */}
{data.action !== "Registrar atividade" && data.action !== "Enviar e-mail" && data.action !== "Criar negociação" && (
  <InputContainer sx={{ mt: 1 }} >
    <TextFieldTitle
      label={"Selecione uma ação"}
      fullWidth
      size="small"
      style={{ backgroundColor: "#fff" }}
      value={data.output}
      disabled
      onChange={(event) => setData({ ...data, output: event.target.value })}
    />
  </InputContainer>
)}

{/* Componente que aparecerá quando a condição for 'Follow up' */}
{data.action === "Enviar e-mail" && (
     <FormControl sx={{ mt: 2 }}  fullWidth>
        <InputLabel
          htmlFor="uncontrolled-native"
          sx={{ mt: "-7px" }}
        >
          Selecione um e-mail
        </InputLabel>

        <Select
          onChange={(event) =>
            setData({ ...data, output: event.target.value })
          }
          style={{backgroundColor:"#fff"}}
          value={data.output}
          label="Selecione um e-mail"
          size="small"
          disabled={!props.hasEdit}
          fullWidth
        >
          {mailers.map((state) => (
            <MenuItem key={state.id} value={state.subject}>
              {state.subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
)}

{/* Componente que aparecerá quando a condição for 'Criar contato' */}
{data.action === "Registrar atividade" && (

<InputContainer sx={{ mt: 2 }} >
<TextFieldTitle
  label={"Insira o nome da atividade"}
  fullWidth
  disabled={!props.hasEdit}
  size="small"
  style={{backgroundColor:"#fff"}}
  value={data.output}
  onChange={(event) => setData({ ...data, output: event.target.value })}
/>
</InputContainer>)}

{/* Componente que aparecerá quando a condição for 'Alterar status de negociação' */}
{data.action === "Criar negociação" && (

<InputContainer sx={{ mt: 1 }} >
<TextFieldTitle
  label={"Insira o valor da negociação"}
  fullWidth
  size="small"
  disabled={!props.hasEdit}
  style={{backgroundColor:"#fff"}}
  value={data.output}
  onChange={(event) => setData({ ...data, output: event.target.value })}
/>
</InputContainer>
)}


</div>      </CompanyDetailCardContainer>
    </div>
  );
};
export default DealDetailCard;
