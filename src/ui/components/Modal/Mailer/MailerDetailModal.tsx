import React, { useContext, useState } from "react";
import Title from "../../Title/Title";
import { ModalContainer } from "../ModalStyles/ModalContainer.style";
import { ModalStyled } from "../ModalStyles/Modal.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import MailerDetailCard from "../../MailerDetailCard/MailerDetailCard";
import { useCompanyPage } from "../../../../data/services/hooks/PageHooks/CompanyHook";
import { Button, Tooltip } from "@material-ui/core";
import Dialog from "../../Dialog/Dialog";
import { MdClose } from "react-icons/md";
import { AutomatiionTypes } from "types/Automation";
import { useAutomationPage } from "data/services/hooks/PageHooks/AutomationHook";
import PipelineContext from "contexts/PipelineContext";
import { useMailerPage } from "data/services/hooks/PageHooks/MailerHook";
import { MailerTypes } from "types/Mailer";
import { FaInfoCircle } from "react-icons/fa";

interface MailerDetailModalProps {
  open: boolean;
  mailer: any;
  setOpen: any;
  getData: () => void;
  isAdmin: boolean;
}

const MailerDetailModal: React.FC<MailerDetailModalProps> = ({
  open,
  mailer,
  setOpen,
  getData,
  isAdmin,
}) => {
  const { editMailer, deleteMailer } = useMailerPage();
  const [hasEdit, setHasEdit] = useState(false);
  const [dialogView, setDialogView] = useState(false);
  const [dialogViewer, setDialogViewer] = useState(false);

  const handleSubmitEdit = async (data: AutomatiionTypes) => {
    await editMailer(mailer.id, data);
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
        title={"Deletar e-mail"}
        message={
          <>
            <span>Tem certeza que deseja deletar {mailer?.subject}?</span>
          </>
        }
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await deleteMailer(mailer.id);
            getData();
            onClose();
          }
        }}
      />
      <Dialog
        title={"Dicionário de Tags"}
        message={
          <>
            <span style={{ display: "block" }}>
              Você pode automatizar seu e-mail para que ele funcione para todos seus clientes!
            </span>
            <span>
              <ul>
                <li>{`Adicione {{Contact}} para substituir a tag pelo nome do contato`}</li>
                <li>{`Adicione {{Email}} para substituir a tag pelo e-mail do contato`}</li>
                <li>{`Adicione {{Name}} para substituir a tag pelo nome da negociação`}</li>
              </ul>
              <div style={{display:"flex", gap:"5px"}}>
              <b>Obs:</b><span>As tags funcionam apenas na MENSAGEM do e-mail </span></div>
            </span>
          </>
        }
        type={"info"}
        open={dialogViewer}
        setOpen={() => setDialogViewer(false)}
        result={async (res) => {
          if (res) {
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

      <Title title={`Detalhes do e-mail ${mailer?.subject}`} />

      <div style={{ display: "flex", justifyContent: "right" }}>
          <Tooltip
            title="Dicionário de Tags"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              onClick={() => {
                setDialogViewer(true);
              }}
              size="small"
              sx={{
                width: "170px",
                mb: 2,
                gap:"5px"
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              <FaInfoCircle/> 
              Dicionário de tags
            </Button>
          </Tooltip>
        </div>
      <MailerDetailCard
        onClick={() => setHasEdit(!hasEdit)}
        hasEdit={hasEdit}
        id={mailer.id}
        subject={mailer?.subject}
        title={mailer?.title}
        text={mailer?.text}
        template={mailer?.template}
        color={mailer?.color}
        isAdmin={isAdmin}
        saveEdit={(data: MailerTypes) => {
          handleSubmitEdit(data);
        }}
      />
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "center", flexDirection:"column", alignItems:"center"}}>
          <Tooltip
            title="Deletar e-mail"
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
export default MailerDetailModal;
