/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { ModalContainer } from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import Title from "../../Title/Title";
import { Button } from "@material-ui/core";
import { ModalStyled } from "../ModalStyles/Modal.style";
import Delete from "@material-ui/icons/Delete";
import CompanyContext from "contexts/CompanyContext";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { MdClose } from "react-icons/md";

const DeleteCompanyModal = ({ id }) => {
  const { deleteCompanyModal, useDeleteCompanyModal } =
    useContext(CompanyContext);
  const { deleteCompany } = useCompanyPage();
  const handleDeleteCompany = async () => {
    try {
      await deleteCompany(id);
      useDeleteCompanyModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  const body = (
    <ModalContainer>
      <CloseButtonStyled
        onClick={() => {
          useDeleteCompanyModal();
        }}
      >
      <MdClose/>
      </CloseButtonStyled>

      <Title
        title="Deletar produto"
        subtitle={
          <>
            <p>
              <strong>
                Tem certeza que deseja deletar esse produto?
              </strong>
            </p>
          </>
        }
      />

      <Button
        variant="contained"
        color="error"
        style={{ color: "#ffffff" }}
        onClick={() => handleDeleteCompany()}
        startIcon={<Delete />}
        sx={{ mt: 4 }}
      >
        Deletar
      </Button>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={deleteCompanyModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default DeleteCompanyModal;
