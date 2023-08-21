import React, { useState } from "react";
import Title from "../Title/Title";
import { ModalContainer } from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import CompanyDetailCard from "../CompanyDetailCard/CompanyDetailCard";
import { useCompanyPage } from "../../../data/services/hooks/PageHooks/CompanyHook";
import { Button, Tooltip } from "@material-ui/core";
import Dialog from "../Dialog/Dialog";
import { MdClose } from "react-icons/md";

interface CompanyDetailModalProps {
  open: boolean;
  company: any;
  setOpen: any;
  getData: () => void;
  isAdmin: boolean;
}

const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  open,
  company,
  setOpen,
  getData,
  isAdmin,
}) => {
  const { editCompany, deleteCompany } = useCompanyPage();
  const [hasEdit, setHasEdit] = useState(false);
  const [dialogView, setDialogView] = useState(false);

  const handleSubmitEdit = async (data: CompanyTypes) => {
    await editCompany(company.id, data);
    getData();
    onClose();
  };

  const onClose = () => {
    setHasEdit(false);
    setOpen(false);
  };

  const body = (
    <ModalContainer>
      <Dialog
        title={"Deletar canal"}
        message={
          <>
            <span style={{ display: "block" }}>
              Ao deletar um canal, os dados de contatos e negociações
              vinculados a esse canal também serão apagados
            </span>
            <span>Tem certeza que deseja deletar <b>{company?.name}</b>?</span>
          </>
        }
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await deleteCompany(company.id);
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

      <Title title={`Detalhes do canal ${company?.name}`} />

      <CompanyDetailCard
        onClick={() => setHasEdit(!hasEdit)}
        hasEdit={hasEdit}
        id={company.id}
        name={company?.name}
        city={company?.city}
        state={company?.state}
        country={company?.country}
        site={company?.site}
        picture={company?.picture}
        saveEdit={(data: CompanyTypes) => {
          handleSubmitEdit(data);
        }}
      />
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "center", width:"100%" }}>
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
export default CompanyDetailModal;
