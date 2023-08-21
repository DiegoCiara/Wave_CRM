import React, { useContext, useEffect, useState } from "react";

import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@material-ui/core";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { MdClose } from "react-icons/md";
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";

interface UpdateModalProps {
  getData: () => any;
}

const UpDateModal = ({ getData }: UpdateModalProps) => {
  const {
    updateModalState,
    UseUpdateModal,
    updatePipeline,
    pipeline,
    hasError,
    isLoading,
    dealsList,
  } = useContext(PipelineContext);
  const [name, setName] = useState(pipeline?.name);
  const [description, setDescription] = useState(pipeline?.description);

  const [submited, setSubmited] = useState(false);

  useEffect(() => {
    if (pipeline?.name) {
      setName(pipeline?.name);
    }
  }, [pipeline]);

  useEffect(() => {
    if (pipeline?.description) {
      setDescription(pipeline?.description);
    }
  }, [pipeline]);




  
  // Função que filtra os funis que os pipelines participam

  const { funnels } = useFunnelPage()
  const [selectedPipelineName, setSelectedPipelineName] = useState('');
  const [selectedFunnelId, setSelectedFunnelId] = useState('');
// Definir o primeiro funil como valor padrão para o estado selectedFunnelId
useEffect(() => {
  if (funnels.length > 0) {
    setSelectedFunnelId(funnels[0].id);
  }
}, [funnels]);

  const handleFunnelIdChange = (event) => {
    setSelectedFunnelId(event.target.value);
    setSelectedPipelineName(''); // Limpa o filtro do nome do pipeline
  };


  const [funnelSelected, setFunnelSelected] = useState(null);

// ...

useEffect(() => {
  setFunnelSelected(selectedFunnelId);
}, [selectedFunnelId]);

// ...
// ...

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
            UseUpdateModal("");
          }}
        >
        <MdClose/>
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Editar pipeline" />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : !isLoading && hasError ? (
        <div>{hasError}</div>
      ) : (
        <TextFieldMask
          id="outlined-basic"
          label="Nome do pipeline"
          size="small"
          required
          fullWidth
          focused={pipeline ? true : false}
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={submited && !name}
        />
      )}
        <TextFieldMask
          id="outlined-basic"
          label="Descrição do pipeline"
          size="medium"
          rows={3}
          multiline
          required
          fullWidth
          focused={pipeline ? true : false}
          value={description || "Não possui"}
          onChange={(event) => setDescription(event.target.value)}
          error={submited && !description}
        />

      <Tooltip
        title="Salvar alteração"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          onClick={async () => {
            setSubmited(true);
            if (name?.length && description?.length) {
              await updatePipeline(name, description);
              await getData();
              setSubmited(false);
            }
          }}
          variant="contained"
          color="primary"
          startIcon={<i className="fa fa-pensil"></i>}
          sx={{ margin: "32px auto 0 auto", minWidth: "100px" }}
        >
          Salvar
        </Button>
      </Tooltip>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={updateModalState}
        onClose={() => UseUpdateModal("")}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default UpDateModal;
