import React, { useContext, useState } from "react";
import Title from "../../Title/Title";
import { ModalContainer } from "../ModalStyles/ModalContainer.style";
import { ModalStyled } from "../ModalStyles/Modal.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import { CompanyTypes } from "types/Company";
import { useCompanyPage } from "../../../../data/services/hooks/PageHooks/CompanyHook";
import { Button, Tooltip } from "@material-ui/core";
import Dialog from "../../Dialog/Dialog";
import { MdClose } from "react-icons/md";
import { AutomatiionTypes } from "types/Automation";
import { useAutomationPage } from "data/services/hooks/PageHooks/AutomationHook";
import PipelineContext from "contexts/PipelineContext";
import { IProduct } from "types/Product";
import { useProductPage } from "data/services/hooks/PageHooks/ProductHook";
import ProductDetailCard from "ui/components/ProductDetailCard/ProductDetailCard";

interface ProductDetailModalProps {
  open: boolean;
  Product: any;
  setOpen: any;
  getData: () => void;
  isAdmin: boolean;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  Product,
  setOpen,
  getData,
  isAdmin,
}) => {
  const { editProduct, deleteProduct } = useProductPage();
  const [hasEdit, setHasEdit] = useState(false);
  const [dialogView, setDialogView] = useState(false);

  const handleSubmitEdit = async (data: IProduct) => {
    await editProduct(Product.id, data);
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
        title={"Deletar produto"}
        message={
          <>
            <span>Tem certeza que deseja deletar <b>{Product?.name}</b>?</span>
          </>
        }
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await deleteProduct(Product.id);
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

      <Title title={`Detalhes do produto ${Product?.name}`} />

      <ProductDetailCard      
        onClick={() => setHasEdit(!hasEdit)}
        hasEdit={hasEdit}
        id={Product.id}
        name={Product?.name}
        value={Product?.value}
        description={Product?.description}
        saveEdit={(data: AutomatiionTypes) => {
          handleSubmitEdit(data);
        }}
      />
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "center" , width:"100%", alignItems:"center"}}>
          <Tooltip
            title="Deletar produto"
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
export default ProductDetailModal;
