import React, { useContext, useState } from "react";
import Title from "../../Title/Title";
import { ModalContainer } from "../ModalStyles/ModalContainer.style";
import { ModalStyled } from "../ModalStyles/Modal.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import AutomationDetailCard from "../../AutomationDetailCard/AutomationDetailCard";
import { useCompanyPage } from "../../../../data/services/hooks/PageHooks/CompanyHook";
import { Button, Tooltip } from "@material-ui/core";
import Dialog from "../../Dialog/Dialog";
import { MdClose } from "react-icons/md";
import { AutomatiionTypes } from "types/Automation";
import { useAutomationPage } from "data/services/hooks/PageHooks/AutomationHook";
import PipelineContext from "contexts/PipelineContext";

interface AutomationDetailModalProps {
  open: boolean;
  automation: any;
  setOpen: any;
  getData: () => void;
  isAdmin: boolean;
}

const AutomationDetailModal: React.FC<AutomationDetailModalProps> = ({
  open,
  automation,
  setOpen,
  getData,
  isAdmin,
}) => {
  const { editAutomation, deleteAutomation } = useAutomationPage();
  const [hasEdit, setHasEdit] = useState(false);
  const [dialogView, setDialogView] = useState(false);

  const handleSubmitEdit = async (data: AutomatiionTypes) => {
    await editAutomation(automation.id, data);
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
        title={"Deletar automação"}
        message={
          <>
            <span style={{ display: "block" }}>
              Ao deletar uma automação, os recursos automáticos não irão mais funcionar
            </span>
            <span>Tem certeza que deseja deletar <b>{automation?.name}</b>?</span>
          </>
        }
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await deleteAutomation(automation.id);
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

      <Title title={`Detalhes da automação ${automation?.name}`} />

      <AutomationDetailCard
        onClick={() => setHasEdit(!hasEdit)}
        hasEdit={hasEdit}
        id={automation.id}
        name={automation?.name}
        input={automation?.input}
        output={automation?.output}
        condition={automation?.condition}
        action={automation?.action}
        saveEdit={(data: AutomatiionTypes) => {
          handleSubmitEdit(data);
        }}
      />
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "right" }}>
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
              // variant="contained"
              size="small"
              sx={{
                width: "100%",
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
export default AutomationDetailModal;
