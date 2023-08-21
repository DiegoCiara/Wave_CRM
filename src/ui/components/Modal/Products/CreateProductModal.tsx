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
import { IProduct } from "types/Product";
import TextFieldTitle from "ui/components/Input/TextFieldMask/TextFieldMaskSecond";
import { useProductPage } from "data/services/hooks/PageHooks/ProductHook";
import { formatCurrency } from "data/utils/formatValue";

interface CreateProductModalProps {
  open: boolean;
  setOpen: any;
  getData: () => void;
}
const CreateProductModal: React.FC<CreateProductModalProps> = ({
  open,
  setOpen,
  getData,
}) => {
  const { createProduct } = useProductPage();

  const [data, setData] = useState<IProduct>({
    name: "",
    value: "",
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
      await createProduct(data);
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

      <Title title="Novo produto" />
        <TextFieldTitle
          style={{ marginBottom: "-18px" }}
          onChange={(event) => setData({ ...data, name: event.target.value })}
          value={data.name}
          label="Nome do produto"
          size="small"
          fullWidth
          error={submit && !data.name}
          helperText={!data.name && submit ? "Informe o nome do produto" : " "}
        />
        <TextFieldMask
            onChange={(event) =>
              setData({ ...data, value: formatCurrency(event.target.value) })
            }
            value={ data.value}
            id="outlined-basic"
            label="Valor R$"
            size="small"
            fullWidth
            placeholder="0,00"
            required
          />
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
          helperText={!data.description && submit ? "Informe a descrição do produto" : " "}
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

export default CreateProductModal;
