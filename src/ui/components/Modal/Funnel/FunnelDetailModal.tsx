import React, { useContext, useState } from "react";
import Title from "../../Title/Title";
import { ModalContainer } from "../ModalStyles/ModalContainer.style";
import { ModalStyled } from "../ModalStyles/Modal.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import FunnelDetailCard from "../../FunnelDetailCard/FunnelDetailCard";
import { useCompanyPage } from "../../../../data/services/hooks/PageHooks/CompanyHook";
import { Button, Tooltip } from "@material-ui/core";
import Dialog from "../../Dialog/Dialog";
import { MdClose } from "react-icons/md";
import { AutomatiionTypes } from "types/Automation";
import { useAutomationPage } from "data/services/hooks/PageHooks/AutomationHook";
import PipelineContext from "contexts/PipelineContext";
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";
import { Funnel } from "types/Funnel";

interface FunnelDetailModalProps {
  open: boolean;
  funnel: any;
  setOpen: any;
  getData: () => void;
  isAdmin: boolean;
}

const FunnelDetailModal: React.FC<FunnelDetailModalProps> = ({
  open,
  funnel,
  setOpen,
  getData,
  isAdmin,
}) => {
  const { editFunnel, deleteFunnel } = useFunnelPage();
  const [hasEdit, setHasEdit] = useState(false);
  const [dialogView, setDialogView] = useState(false);

  const handleSubmitEdit = async (data: Funnel) => {
    await editFunnel(funnel.id, data);
    getData();
    onClose();
  };

  const onClose = () => {
    setHasEdit(false);
    setOpen(false);
  };

  
  const {
    getPipelines,
  } = useContext(PipelineContext);
  const body = (
    <ModalContainer>
      <Dialog
        title={"Deletar funil"}
        message={
          <>
            <span style={{ display: "block" }}>
              Ao deletar um funil, todos os pipelines que fazem parte desse funil também serão deletados e as negociações que estão presentes nesse funil serão arquivadas
            </span>
            <span>Tem certeza que deseja deletar <b>{funnel?.name}</b>?</span>
          </>
        }
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await deleteFunnel(funnel.id);
            getData();
            onClose();
          }
        }}
      />


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

      <Title title={`Detalhes da automação ${funnel?.name}`} />

      <FunnelDetailCard
        onClick={() => setHasEdit(!hasEdit)}
        hasEdit={hasEdit}
        id={funnel.id}
        name={funnel?.name}
        description={funnel?.description}
        saveEdit={(data: AutomatiionTypes) => {
          handleSubmitEdit(data);
        }}
      />
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "center" , width:"100%", alignItems:"center"}}>
          <Tooltip
            title="Deletar canal"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              onClick={() => {
                setDialogView(true);
              }}
              size="small"
              sx={{
                width: "160px",
                mb: 2,
              }}
              color="error"
              type="submit"
            >
              Deletar
            </Button>
          </Tooltip>
        </div>
      )}
    </ModalContainer>
  );
  return (
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
  );
};
export default FunnelDetailModal;
