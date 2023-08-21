/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from "react";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "../ModalStyles/ModalContainer.style";
import { CloseButtonStyled } from "../ModalStyles/CloseButtonModal.style";
import TextFieldMask from "../../Input/TextFieldMask/TextFieldMask";
import Title from "../../Title/Title";
import {
  Button,
  Select,
  MenuItem,
  Tooltip,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import { CompanyTypes } from "types/Company";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import { IContact } from "types/Contact";
import ContactService from "data/services/ContactService";
import CompanyService from "data/services/CompanyService";
import { mockEstados } from "data/utils/mock";
import { toast } from "react-toastify";
import { emailValidator } from "data/utils/emailValidator";
import { formatCpfCnpj } from "data/utils/formatCpf";
import { MdClose } from "react-icons/md";

const CreateContactModalPipe = () => {
  const { createContactModalPipe, useCreateContactModalPipe, getContacts } =
    useContext(ContactContext);
  const [companies, setCompanies] = useState<CompanyTypes[]>([]);

  const [submited, isSubmited] = useState(false);
  const [data, setData] = useState<IContact>({
    socialName: "",
    name: "",
    cpf_cnpj: "",
    company_id: "",
    state: "",
    city: "",
    email: "",
    phone: "",
  });

  const createContact = async () => {
    isSubmited(true);
    if (data.name && emailValidator(data.email) && data.company_id) {
      await ContactService.createContact({
        socialName: data?.socialName,
        name: data?.name,
        cpf_cnpj: data?.cpf_cnpj,
        email: data?.email,
        phone: data?.phone,
        city: data?.city,
        state: data?.state,
        company: data?.company_id,
      });

      await getContacts();
      isSubmited(false);
      onClose();
    } else {
      toast.warning(
        "Preenchimento invalido, Verique os campos e tente novamente"
      );
    }
  };

  async function getCompanies() {
    const companies = await CompanyService.getCompanies();
    setCompanies(companies);
  }

  useEffect(() => {
    if (!companies.length) {
      getCompanies();
    }
    isSubmited(false);
    setData({
      name: "",
      socialName: "",
      cpf_cnpj: "",
      company_id: "",
      state: "",
      city: "",
      email: "",
      phone: "",
    });
  }, []);

  const onClose = () => {
    setData({
      name: "",
      socialName: "",
      cpf_cnpj: "",
      company_id: "",
      state: "",
      city: "",
      email: "",
      phone: "",
    });
    useCreateContactModalPipe();
  };
  function reloadPage(){
    window.location.reload()
  }
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

      <Title title="Adicionar contato" />

      <TextFieldMask
        onChange={(event) => setData({ ...data, socialName: event.target.value })}
        value={data.socialName}
        label="Razão Social"
        size="small"
        fullWidth
        required
        error={submited && !data.socialName}
      />
      <TextFieldMask
        onChange={(event) => setData({ ...data, cpf_cnpj: event.target.value })}
        value={formatCpfCnpj(data.cpf_cnpj) }
        label="CPF/CNPJ"
        size="small"
        fullWidth
        required
        error={submited && !data.cpf_cnpj}
      />
      <TextFieldMask
        onChange={(event) => setData({ ...data, name: event.target.value })}
        value={data.name}
        label="Nome do contato"
        size="small"
        fullWidth
        required
        error={submited && !data.name}
      />

      <TwoColumnsContainer>
      <TextFieldMask
        onChange={(event) => setData({ ...data, email: event.target.value })}
        value={data.email}
        label="Email"
        size="small"
        fullWidth
        required
        error={submited && !emailValidator(data.email)}
        helperText={
          submited && !emailValidator(data.email) && "E-mail invalido"
        }
      />

        <TextFieldMask
          onChange={(event) => setData({ ...data, phone: event.target.value })}
          value={data.phone}
          label="Telefone"
            size="small"
          fullWidth
        />
      </TwoColumnsContainer>

      <TwoColumnsContainer>
        <TextFieldMask
          onChange={(event) => setData({ ...data, city: event.target.value })}
          value={data.city}
          label="Cidade"
          size="small"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel htmlFor="uncontrolled-native" 
            style={{marginTop: "-7px"}}>
            Estado
          </InputLabel>
          <Select
            onChange={(event) =>
              setData({ ...data, state: event.target.value })
            }
            value={data.state}
            label="Estado"
            fullWidth
            size="small"

          >
            {mockEstados.map((state) => (
              <MenuItem key={state.id} value={state.sigla}>
                {state.sigla}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TwoColumnsContainer>
      <TwoColumnsContainer style={{marginTop:"10px"}}>
      <FormControl
          fullWidth
          required
          sx={{ mb: submited && !data?.state && 0 }}
        >
          <InputLabel
                htmlFor="uncontrolled-native"
            error={submited && !data?.company_id}
            style={{marginTop: "-7px"}}
          >
            Canal (de onde veio)
          </InputLabel>
          <Select
            onChange={(event) =>
              setData({ ...data, company_id: event.target.value })
            }
            value={data?.company_id || ""}
            label="Canal (de onde veio)"
            size="small"

            fullWidth
            error={submited && !data?.company_id}
          >
            {companies?.map((company) => (
              <MenuItem value={company.id} key={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </TwoColumnsContainer>

      <Tooltip
        title="Adicionar contato"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => ( createContact(), reloadPage())} 
          startIcon={<AddCircleIcon />}
          sx={{ mt: 2 }}
        >
          Adicionar
        </Button>
      </Tooltip>
    </ModalContainer>
  );
  return (
    <>
      <ModalStyled
        open={createContactModalPipe}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default CreateContactModalPipe;