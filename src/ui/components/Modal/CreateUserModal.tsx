import React, { useState } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Title from "../Title/Title";
import { useUserPage } from "data/services/hooks/PageHooks/UserHook";
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { IUser } from "types/User";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

interface CreateUserModalProps {
  open: boolean;
  setOpen: any;
  getData: () => void;
}
const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  setOpen,
  getData,
}) => {
  const { createUser } = useUserPage();

  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    role: "",
    picture: "",
  });

  async function handleSubmit() {
    setSubmit(true);
    if (data.name && data.email && data.role) {
      await createUser(data);
      getData();
      setSubmit(false);
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
      email: "",
      role: "",
      picture: "",
    });
    setOpen(false);
    setSubmit(false);
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

      <Title title="Novo usuário" />
      <TwoColumnsContainer>
        <TextFieldMask
          onChange={(event) => setData({ ...data, name: event.target.value })}
          value={data.name}
          label="Nome"
          size="small"
          fullWidth
          required
          error={submit && !data.name}
        />

        <TextFieldMask
          onChange={(event) => setData({ ...data, email: event.target.value })}
          value={data.email}
          label="Email"
          size="small"
          fullWidth
          required
          error={submit && !data.email}
        />

        <FormControl fullWidth sx={{ mb: submit && !data.role && 0 }}>
          <InputLabel
            htmlFor="uncontrolled-native"
            error={submit && !data.role}
            style={{marginTop: "-7px"}}
            required
          >
            Perfil
          </InputLabel>
          <Select
            onChange={(event) => setData({ ...data, role: event.target.value })}
            value={data.role}
            size="small"
            fullWidth
            error={submit && !data.role}
          >
            <MenuItem value={"ADMIN"}>Administrador</MenuItem>
            <MenuItem value={"SELLER"}>Vendedor</MenuItem>
          </Select>
        </FormControl>

      </TwoColumnsContainer>
      <Tooltip
        title="Adicionar usuário"
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

export default CreateUserModal;
