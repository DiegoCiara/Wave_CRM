import React, { useContext, useState , useEffect } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { MdClose } from "react-icons/md";
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";

interface CreateModalProps {
  getData: () => any;
  funnelSelect: any;
}

const CreateModal = ({ getData, funnelSelect }: CreateModalProps) => {
  const { createModalState, dealsList, UseCreateModal, createPipeline, pipeline, pipelines } = useContext(PipelineContext);

  const [submited, isSubmited] = useState(false);
  const [value, setValue] = useState("");
  const [name, setName] = useState(pipeline?.name);
  const [description, setDescription] = useState(pipeline?.description);
  const [funnel, setFunnel] = useState(pipeline?.funnel_id);

  const { funnels } = useFunnelPage()
  const [selectedPipelineName, setSelectedPipelineName] = useState('');
  const [selectedFunnelId, setSelectedFunnelId] = useState('');

  
  useEffect(() => {
    funnel ===funnelSelect
    setFunnel(funnelSelect);
  }, [funnelSelect]);
  

  const body = (
    <ModalContainer >
      <Tooltip
        title="Fechar"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <CloseButtonStyled
          onClick={() => {
            // setValue("");
            isSubmited(false);
            UseCreateModal();
          }}
        >
        <MdClose/>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Novo pipeline" />

      <TextFieldMask
        onChange={(event) => {
          // value={event.target.value}
          setName(event.target.value);
        }}
        id="outlined-basic"
        label="Nome do pipeline"
        // variant="standard"
        // value={event.target.value}
        size="small"
        fullWidth
        required
        error={submited && !name}
      />
        <FormControl fullWidth>
      <InputLabel  htmlFor="uncontrolled-native">
        Funil
      </InputLabel>
        <Select
          sx={{backgroundColor:'#fff', width:"100%"}}
          size="small"
          label="Funis"
          value={funnelSelect}
          disabled
          // onChange={() => {
          //   setFunnel(funnelSelect);
          // }}
        >
          <MenuItem value={null} disabled>Selecione um funil</MenuItem>
          {funnels.map(( index) => (
            <MenuItem key={index.id} value={index.id}>
              {index.name}
            </MenuItem>
          ))}
        </Select>                
      </FormControl>
      <TextFieldMask
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        id="outlined-basic"
        label="Descrição do pipeline"
        // variant="standard"
        size="medium"
        rows={3}
        multiline
        // value={description}
        fullWidth
        required
        error={submited && !description}
      />

      <Tooltip
        title="Adicionar pipeline"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          onClick={async () => {
            isSubmited(true);
            if (name && description&& funnel ) {
              await createPipeline(name, description, funnel);
              await getData();
              // setValue("");
              isSubmited(false);
            }
          }}
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          sx={{ mt: 4 }}
        >
          Adicionar
        </Button>
      </Tooltip>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={createModalState}
        onClose={() => {
          // setValue("");
          isSubmited(false);
          UseCreateModal();
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CreateModal;
