import React, { useState } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Title from "../Title/Title";
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
import { ModalStyled } from "./ModalStyles/Modal.style";
import { mockEstados } from "data/utils/mock";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

interface CreateCompanyModalProps {
  open: boolean;
  setOpen: any;
  getData: () => void;
}
const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  open,
  setOpen,
  getData,
}) => {
  const { createCompany } = useCompanyPage();

  const [data, setData] = useState<CompanyTypes>({
    name: "",
    country: "",
    state: "",
    city: "",
    site: "",
    picture: "",
    cep: "",
    address: "",
  });

  const [submit, isSubmit] = useState(false);

  async function handleSubmit() {
    isSubmit(true);
    if (data?.name) {
      await createCompany(data);
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
      country: "",
      state: "",
      city: "",
      site: "",
      picture: "",
      cep: "",
      address: "",
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

      <Title title="Novo canal de vendas" />
      <TwoColumnsContainer>
        <TextFieldMask
          style={{ marginBottom: "-14px" }}
          onChange={(event) => setData({ ...data, name: event.target.value })}
          value={data.name}
          label="Nome do canal"
          
          size="small"
          fullWidth
          error={submit && !data.name}
          helperText={!data.name && submit ? "Informe o nome do canal" : " "}
        />

        <TextFieldMask
          onChange={(event) => setData({ ...data, city: event.target.value })}
          value={data.city}
          label="Cidade"
          
          size="small"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel style={{marginTop: "-7px"}} htmlFor="uncontrolled-native">
            Estado
          </InputLabel>
          <Select
            onChange={(event) =>
              setData({ ...data, state: event.target.value })
            }
            
            value={data.state}
            label="Estado"
            size="small"
            fullWidth
          >
            <MenuItem value={"null"} disabled>
              Selecione o Estado
            </MenuItem>
            {mockEstados.map((state) => (
              <MenuItem key={state.id} value={state.sigla}>
                {state.sigla}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextFieldMask
          onChange={(event) =>
            setData({ ...data, country: event.target.value })
          }
          value={data.country}
          label="País"
          
          size="small"
          fullWidth
        />

        <TextFieldMask
          onChange={(event) => setData({ ...data, site: event.target.value })}
          value={data.site}
          label="Site"
          
          size="small"
          fullWidth
        />

        {/* <TextFieldMask
          onChange={(event) =>
            setData({ ...data, picture: event.target.value })
          }
          value={data.picture}
          label="Link de imagem"
          
          size="small"
          fullWidth
        /> */}
      </TwoColumnsContainer>
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

export default CreateCompanyModal;
