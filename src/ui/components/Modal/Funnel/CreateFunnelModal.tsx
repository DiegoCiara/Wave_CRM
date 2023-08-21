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
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";
import { Funnel } from "types/Funnel";
import TextFieldTitle from "ui/components/Input/TextFieldMask/TextFieldMaskSecond";

interface CreateFunnelModalProps {
  open: boolean;
  setOpen: any;
  getData: () => void;
}
const CreateFunnelModal: React.FC<CreateFunnelModalProps> = ({
  open,
  setOpen,
  getData,
}) => {
  const { createFunnel } = useFunnelPage();

  const [data, setData] = useState<Funnel>({
    name: "",
    description: "",
  });

  const [submit, isSubmit] = useState(false);

  
  const [isModel, setIsModel] = useState(false);

  useEffect(() => {
    setIsModel(isModel);
  }, [isModel]);
  
  async function handleSubmit() {
    isSubmit(true);
    if (data?.name && data?.description) {
      await createFunnel(data);
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
      description: "",
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

      <Title title="Novo funil" />
      <TwoColumnsContainer>
        <div/>
        <div style={{display:"flex", justifyContent:"end", width:"100%"}}>
        <input type="checkbox" checked={isModel} onChange={(event) => setIsModel(event.target.checked)}/>
          Utilizar modelo de funil.
          </div>
      </TwoColumnsContainer>
      {isModel? (
      <FormControl fullWidth style={{marginTop:"7px", marginBottom:"7px"}}>
          <InputLabel  htmlFor="uncontrolled-native" sx={{mt:"-7px"}}>
            Escolha um modelo
          </InputLabel>
          <Select
            sx={{backgroundColor:'#fff', width:"100%"}}
            size="small"
            label="Escolha um modelo"
            onChange={(event) => setData({ ...data, name: event.target.value })}
            value={data.name}
          >
            <MenuItem value={null} disabled>Selecione um funil</MenuItem>
              <MenuItem value="Funil de relacionamento">Funil de relacionamento</MenuItem>
              <MenuItem value="Funil de SaaS(Software as a Service)">Funil de SaaS(Software as a Service)</MenuItem>
              <MenuItem value="Funil Cross-selling/Upselling">Funil Cross-selling/Upselling</MenuItem>
              <MenuItem value="Funil de produtos">Funil de produtos</MenuItem>
              <MenuItem value="Funil de consultoria">Funil de consultoria</MenuItem>
          </Select>                
        </FormControl>
      ):(        
        <TextFieldTitle
          style={{ marginBottom: "-18px" }}
          onChange={(event) => setData({ ...data, name: event.target.value })}
          value={data.name}
          label="Nome do funil"
          size="small"
          fullWidth
          error={submit && !data.name}
          helperText={!data.name && submit ? "Informe o nome do funil" : " "}
        />
      )}
            <TextFieldTitle
            style={{backgroundColor:"#fff"}}
              value={data.description}
              onChange={(event) => {
                setData({ ...data, description: event.target.value });
                // setSelectPipeline(formatListThisCompanyToSelect(event.target.value));
                  }}
              label="Descrição"
              multiline
              fullWidth
              required
              error={submit && !data.description}
              helperText={!data.description && submit ? "Informe a descrição do funil" : " "}
            />
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

export default CreateFunnelModal;
