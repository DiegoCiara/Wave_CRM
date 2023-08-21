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
import DeleteIcon from "@material-ui/icons/Delete";
import { ModalStyled } from "../ModalStyles/Modal.style";
import ContactContext from "contexts/ContactContext";
import { IContact } from "types/Contact";
import ContactService from "data/services/ContactService";
import CompanyService from "data/services/CompanyService";
import { mockEstados } from "data/utils/mock";
import { toast } from "react-toastify";
import Dialog from "ui/components/Dialog/Dialog";
import { emailValidator } from "data/utils/emailValidator";
import { formatCpfCnpj } from "data/utils/formatCpf";
import { FaFileMedical } from "react-icons/fa";
import CreateDealModal from "../CreateDealModal";
import PipelineContext from "contexts/PipelineContext";
import { MdClose } from "react-icons/md";
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";
import CreateDealContactModal from "../CreateDealContactModal";
import Head from "next/dist/shared/lib/head";

const UpdateContactModal = ({ id, setId, isAdmin, getData }) => {
  const { updateContactModal, useUpdateContactModal, getContacts } =
    useContext(ContactContext);
  const [companies, setCompanies] = useState<CompanyTypes[]>([]);
  const [dialogView, setDialogView] = useState(false);
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

  
  const {
    UseCreateDealContactModal,
    getPipelines,
    dealsList,
    pipelines,
  } = useContext(PipelineContext);

  const mySetId = () => {
    setId();
  };

  const getSelectedContact = async () => {
    const data = await ContactService.getContact(id);

    const myResponse = {
      ...data,
      company_id: data.company?.id,
    };

    setData(myResponse);
  };

  
  const { funnels } = useFunnelPage()
  const [selectedPipelineName, setSelectedPipelineName] = useState('');
  const [selectedFunnelId, setSelectedFunnelId] = useState('');
// Definir o primeiro funil como valor padrão para o estado selectedFunnelId
useEffect(() => {
  if (funnels.length > 0) {
    setSelectedFunnelId(funnels[0].id);
  }
}, [funnels]);

  const handleFunnelIdChange = (event) => {
    setSelectedFunnelId(event.target.value);
    setSelectedPipelineName(''); // Limpa o filtro do nome do pipeline
  };

  const filteredPipelines = Object.values(dealsList).filter((listKey) => {
    if (selectedFunnelId !== '') {
      const pipeline = pipelines.find((p) => p.id === listKey.id);
      return pipeline.funnel.id === selectedFunnelId;
    } else {
      return listKey.name === selectedPipelineName || selectedPipelineName === '';
    }
  });

  const [funnelSelected, setFunnelSelected] = useState(null);

// ...

useEffect(() => {
  setFunnelSelected(selectedFunnelId);
}, [selectedFunnelId]);


  useEffect(() => {
    getSelectedContact();
  }, []);

  const updateContact = async () => {
    if (data.name && emailValidator(data.email) && data.company_id) {
      try {
        await ContactService.updateContact({
          id,
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
        mySetId();
        useUpdateContactModal();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      isSubmited(true);
      toast.warning(
        "Preenchimento invalido, Verique os campos e tente novamente"
      );
    }
  };

  const getCompanies = async () => {
    const companies = await CompanyService.getCompanies();

    setCompanies(companies);
  };

  useEffect(() => {
    if (!companies.length) getCompanies();
  }, []);

  const body = (
    <ModalContainer>
    <Head>
      <title>Contato: {data?.name}</title>
    </Head>
      <Dialog
        title={"Deletar contato"}
        message={`Tem certeza que deseja deletar ${data?.name}?`}
        type={"question"}
        open={dialogView}
        setOpen={() => setDialogView(false)}
        result={async (res) => {
          if (res) {
            await ContactService.deleteContact(id);
            getData();
            useUpdateContactModal();
            mySetId();
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
            useUpdateContactModal();
            mySetId();
          }}
        >
          <MdClose/>
          {/* <i className="fa fa-times" aria-hidden="true"></i> */}
        </CloseButtonStyled>
      </Tooltip>

      <Title title="Editar contato" />
      <div style={{width:"100%", display:"flex", justifyContent:"end"}}>
          <Button
              sx={{ display: "flex", justifyContent: "end", gap: "10px"}}
              onClick={() => {
                UseCreateDealContactModal();
              }}
              variant="contained"
              size="small"
            >
              <FaFileMedical></FaFileMedical>

              Criar negociação
            </Button>
      </div>

      <TextFieldMask
        onChange={(event) => setData({ ...data, socialName: event.target.value })}
        value={data.socialName}
        label="Razão social"
        size="small"
        fullWidth
        required
        error={submited && !data.socialName}
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
      <TextFieldMask
        onChange={(event) => setData({ ...data, cpf_cnpj: event.target.value })}
        value={formatCpfCnpj(data.cpf_cnpj) }
        label="CPF/CNPJ"
        size="small"
        fullWidth
        required
        error={submited && !data.cpf_cnpj}
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
            type="number"
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

      {isAdmin ? (
        <TwoColumnsContainer>
          <Tooltip
            title="Deletar contato"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setDialogView(true);
              }}
              startIcon={<DeleteIcon />}
              sx={{ mt: 2 }}
            >
              Deletar
            </Button>
          </Tooltip>

          <Tooltip
            title="Salvar alterações"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              color="success"
              style={{ color: "white" }}
              onClick={() => {
                updateContact();
              }}
              startIcon={<AddCircleIcon />}
              sx={{ mt: 2 }}
            >
              Salvar
            </Button>
          </Tooltip>
        </TwoColumnsContainer>
      ) : (
        <Tooltip
          title="Salvar alterações"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Button
            variant="contained"
            color="success"
            style={{ color: "white" }}
            onClick={() => {
              updateContact();
            }}
            startIcon={<AddCircleIcon />}
            sx={{ mt: 2 }}
          >
            Salvar
          </Button>
        </Tooltip>
      )}
    </ModalContainer>
  );
  return (
    <>
    <CreateDealContactModal getData={getPipelines} selectedPipelines={filteredPipelines} />
      <ModalStyled
        open={updateContactModal}
        onClose={mySetId}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};

export default UpdateContactModal;