import React, { useState } from "react";
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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "../ModalStyles/Modal.style";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { MailerTypes } from "types/Mailer";
import { useMailerPage } from "data/services/hooks/PageHooks/MailerHook";
import TextFieldMaskMensage from "ui/components/Input/TextFieldMask/TextArea";
import TextFieldTitle from "ui/components/Input/TextFieldMask/TextFieldMaskSecond";
import Dialog from "ui/components/Dialog/Dialog";
import { FaInfoCircle } from "react-icons/fa";

interface CreateMailerModalProps {
  open: boolean;
  setOpen: any;
  isAdmin: any;
  getData: () => void;
}
const CreateMailerModal: React.FC<CreateMailerModalProps> = ({
  open,
  setOpen,
  getData,
  isAdmin,
}) => {
  const { createMailer } = useMailerPage();

  const [data, setData] = useState<MailerTypes>({
    subject: "",
    title: "",
    text: "",
    template: "",
    color: "",
  });

  const [submit, isSubmit] = useState(false);

  async function handleSubmit() {
    isSubmit(true);
    if (data?.subject && data?.text && data?.template) {
      if (!data.color) {
        data.color = "#0048fc"; // Valor padrão
      }
      await createMailer(data);
      getData();
      onClose();
    } else {
      toast.warning(
        "Preenchimento inválido, verifique os campos e tente novamente."
      );
    }
  }
      const Template = {
    Professional: "Empresarial",
    Personal: "Pessoal"
  }

  const [dialogViewer, setDialogViewer] = useState(false);
  const onClose = () => {
    setData({
      subject: "",
      title: "",
      text: "",
      template: "",
      color: "",
    });
    isSubmit(false);
    setOpen(false);
  };

  const body = (
    <ModalContainer>
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

      <Title title="Novo e-mail" />
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
              // variant="contained"
              color="primary"
              type="submit"
            >
              <FaInfoCircle/> 
              Dicionário de tags
            </Button>
          </Tooltip>
        </div>
      <TwoColumnsContainer>
        <TextFieldTitle
          style={{ marginBottom: "-14px" }}
          onChange={(event) => setData({ ...data, subject: event.target.value })}
          value={data.subject}
          label="Assunto"
          size="small"
          fullWidth
          error={submit && !data.subject}
          helperText={!data.subject && submit ? "Informe o assunto do e-mail" : " "}
        />
        <FormControl fullWidth>
          <InputLabel htmlFor="uncontrolled-native" sx={{mt:"-7px"}}
          error={submit && !data.template}>
            Tipo de e-mail
          </InputLabel>

          <Select
            onChange={(event) =>
              setData({ ...data, template: event.target.value })
            }
            value={data.template}
            required
            size="small"
            label="Tipo de e-mail"
            fullWidth
            error={submit && !data.template}
          >
          <MenuItem value={"null"} disabled>
            Selecione o tipo de e-mail
          </MenuItem>
            <MenuItem value={Template.Professional} disabled={!isAdmin ? true : false}>
              Empresarial
            </MenuItem>
            <MenuItem value={Template.Personal} >
              Pessoal
            </MenuItem>
          </Select>

          </FormControl >

      </TwoColumnsContainer>

        <FormControl fullWidth>
        <TextFieldTitle
          onChange={(event) => setData({ ...data, title: event.target.value })}
          value={data.title}
          label="Título"
          size="small"
          fullWidth
          error={submit && !data.title}
        />
        </FormControl>
        
        <TextFieldMask
          label="Mensagem"
          size="medium"
          rows={3}
          onChange={(event) => setData({ ...data, text: event.target.value })}
          value={data.text}
          required
          multiline
          error={submit && !data.text}
          />
          <div style={{display:"flex",gap:"10px"}}>
          <input 
            type="color" 
            onChange={(event) => setData({ ...data, color: event.target.value })}
            value={data.color || "#0048fc"}
          />
            Escolha a cor de fundo do e-mail
          </div>
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

export default CreateMailerModal;
