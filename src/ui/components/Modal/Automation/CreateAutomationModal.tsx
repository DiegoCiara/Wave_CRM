import React, { useContext, useEffect, useState } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../../Input/TextFieldMask/TextFieldMask";
import Title from "../../Title/Title";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import {
  Button,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { CompanyTypes } from "types/Company";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "../ModalStyles/Modal.style";
import { mockEstados } from "data/utils/mock";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { AutomatiionTypes } from "types/Automation";
import { useAutomationPage } from "data/services/hooks/PageHooks/AutomationHook";
import { useMailerPage } from "data/services/hooks/PageHooks/MailerHook";
import PipelineContext from "contexts/PipelineContext";
import { SubtitleStyled } from "ui/components/Title/Title.style";
import { InputContainer } from "ui/components/UserDetailCard/UserDetailCard.style";
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";
import TextFieldTitle from "ui/components/Input/TextFieldMask/TextFieldMaskSecond";

interface CreateAutomationModalProps {
  open: boolean;
  setOpen: any;
  getData: () => void;
}
const CreateAutomationModal: React.FC<CreateAutomationModalProps> = ({
  open,
  setOpen,
  getData,
}) => {
  const { createAutomation } = useAutomationPage();

  const [data, setData] = useState<AutomatiionTypes>({
    name: "",
    input: "",
    condition: "",
    action: "",
    output: "",
  });

  const [submit, isSubmit] = useState(false);

  const {
    mailers,
  } = useMailerPage();
  const {
    pipelines,
    dealsList, 
  } = useContext(PipelineContext);

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
    setSelectedFunnelId(funnels[0].id);
  }
}, [funnels]);
  async function handleSubmit() {
    isSubmit(true);
    if (data?.name && data?.input && data?.condition && data?.action && data?.output) {
      await createAutomation(data);
      getData();
      onClose();
    } else {
      toast.warning(
        "Preenchimento invalido, verifique os campos e tente novamente."
      );
    }
  }

  const onClose = () => {
    setData({
      name: "",
      input: "",
      condition: "",
      action: "",
      output: "",
    });
    isSubmit(false);
    setOpen(false);
  };

  const body = (
    <ModalContainer>
      <Tooltip
        title="Fechar"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <CloseButtonStyled
          onClick={() => {
            onClose();
          }}
        >
        <MdClose/>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Nova automação" />     
      <InputContainer>
      <TextFieldTitle
          style={{ marginBottom: "-14px" }}
          onChange={(event) => setData({ ...data, name: event.target.value })}
          value={data.name}
          label="Nome da automação"
          size="small"
          fullWidth
          error={submit && !data.name}
          helperText={!data.name && submit ? "Informe o nome do canal" : " "}
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
  style={{backgroundColor:"#fff"}}
  value={data.output}
  onChange={(event) => setData({ ...data, output: event.target.value })}
/>
</InputContainer>
)}


</div>


      <Tooltip
        title="Adicionar canal"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          onClick={() => handleSubmit()}
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          sx={{ mt: 2 }}
        >
          Adicionar
        </Button>
      </Tooltip>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={open}
        onClose={() => {
          onClose();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default CreateAutomationModal;
