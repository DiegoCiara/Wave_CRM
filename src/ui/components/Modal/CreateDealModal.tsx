import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  List,
  ListItem,
  Tooltip,
  ListItemButton,
  ListItemText,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PipelineContext from "contexts/PipelineContext";
import Title from "../Title/Title";
import TextFieldMask from "../Input/TextFieldMask/TextFieldMask";
import Select from "../Input/Select/Select";
import { DealTypes } from "types/Deal";
import {
  ModalContainer,
  TwoColumnsContainer,
} from "./ModalStyles/ModalContainer.style";
import { ModalStyled } from "./ModalStyles/Modal.style";
import { CloseButtonStyled } from "./ModalStyles/CloseButtonModal.style";
import { formatCurrency } from "data/utils/formatValue";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { toast } from "react-toastify";
import ContactContext from "contexts/ContactContext";
import SearchButtom from "../SearchButton/SearchButton";
import { SubtitleStyled } from "../Title/Title.style";
import { MdClose } from "react-icons/md";
import TextFieldMaskInfo from "../Input/TextFieldMask/TextFieldMaskInfo";
import TextFieldMaskSearch from "../Input/TextFieldMask/TextFieldMasKSearch";
import Head from "next/dist/shared/lib/head";


interface DetailModalProps {
  getData: () => any;
  selectedPipelines: any;
}



const CreateDealModal = ({ getData, selectedPipelines }: DetailModalProps) => {
  const {
    createDealModalState,
    UseCreateDealModal,
    createDeal,
    pipelines,
    selectedPipeline,
  } = useContext(PipelineContext);

  //filtro dos contatos
  const [valueType, setValueType] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectListValues, setSelectListValues] = React.useState([]);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatListThisCompanyToSelect } = useContactPage();
  const [contacts, setContacts] = useState([]);
  const [submited, isSubmited] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [listVisible, setListVisible] = useState(true)

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
  if (event.target.value) {
    const results = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(event.target.value.toLowerCase()) 
    );
    setSearchResults(results);
  } else {
    setSearchResults([]);
  }
};

  const handleChangeValueType = (event) => {
    setSearchTerm("");
    setValueType(event.target.value);
    if (event.target.value === "state") {
      const states = [];
      contacts.forEach((contact) => {
        const state = states.some((state) => state.value === contact.state);
        if (!state) {
          states.push({ label: contact.state, value: contact.state });
        }
      });
      setSelectListValues(states);
    } else if (event.target.value === "company") {
      setSelectListValues(formatCompaniesToSelect);
    } else {
      setSelectListValues([]);
    }
  };
  

  const handleSelect = (id) => {
    setData({ ...data, contact: id });
    setSearchTerm('');
    setSearchResults([]);
    setListVisible(false);
  };


// termina filtro dos contatos


  const [data, setData] = useState<DealTypes>({
    name: "",
    company: "",
    contact: "",
    pipeline: "",
    value: "",
    tag: "",
  });

  useEffect(() => {
    if (selectedPipeline) {
      setData({ ...data, pipeline: selectedPipeline });
    }
    isSubmited(false);
  }, [selectedPipeline]);

  async function handleSubmit() {
    isSubmited(true);
    if (data.name && data.company && data.contact && data.tag && data.value && data.pipeline) {
      try {
        data.value = data.value.replace(/\D+/g, "");
        await createDeal(data);
        await getData();
        setData({
          name: "", 
          company: "",
          contact: "",
          pipeline: "",
          value: "",
          tag: "",
        });
        UseCreateDealModal();
      } catch (e) {
        console.error(e);
      }
    } else {
      toast.warning(
        "Preenchimento invalido, Verique os campos e tente novamente"
      );
    }
  }

  
  const onClose = () => {
    setData({
      name: "",
      company: "",
      contact: "",
      pipeline: "",
      value: "",
      tag: "",
    });
    UseCreateDealModal();
  };

  const body = (
    <ModalContainer>
    <Head>
      <title>Criar negociação | Wave CRM</title>
    </Head>
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

      <Title title="Adicionar negociação" />
      <TextFieldMaskInfo
        onChange={(event) => setData({ ...data, name: event.target.value })}
        value={data.name}
        label="Nome da negociação"
        size="small"
        info='Insira o nome da negociação de acordo com o propósito ou contexto que ela se trata. Exemplo: "Novo contrato", "Nova compra", "Novo Acesso".'
        fullWidth
        required
        error={submited && !data.name}
      />

      <FormControl>
        <InputLabel
            error={submited && !data?.company}
          required
          sx={{ mt: 0 }}
        >
          <span>Canal (de onde veio)</span>
        </InputLabel>
        <Select
          onChange={(event) => {
            setData({ ...data, company: event.target.value });
            setContacts(formatListThisCompanyToSelect(event.target.value));
          }}
          value={data.company}
          label="Canal (de onde veio)"
          size="small"
          fullWidth
          error={submited && !data?.company}
        >
          {formatCompaniesToSelect.map((company) => (
            <MenuItem key={company.value} value={company.value}>
              {company.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{display: "flex", flexDirection:"column", gap:"5px", height:"auto", border:"1px solid #e2e2e2", padding:"5px 10px", paddingTop:"0" ,borderRadius:"5px", backgroundColor:"#fafafa"}}>
      <SubtitleStyled style={{ fontWeight:500 ,height:"10px", margin:"5px", color:"#757575"}}>Contato</SubtitleStyled>

    <FormControl style={{ width: '100%' }}>

      <TextFieldMaskSearch
        label="Pesquisar contato"
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={() => setListVisible(true)}
        icon="fa-magnifying-glass"
        style={{backgroundColor:"#fff"}}
        info='Pesquise o nome do contato que veio do canal de vendas acima para inseri-lo na negociação.'

        margin="normal"
        size="small"
      />
      {searchResults.length > 0 && (
        <List style={{position:"absolute", width:"100%", border:"1px solid #CACACA", top:"40px", zIndex:20, borderTop:"none"}} >
          {searchResults.map((contact) => (
            <ListItemButton  style={{position:"relative", backgroundColor:"white", zIndex:21}} key={contact.id} onClick={() => handleSelect(contact.id)}>
              <ListItemText style={{borderBottom:"1px solid #cacaca"}} primary={`${contact.name}` } secondary={`${contact.cpf_cnpj}`} />
            </ListItemButton>
          ))}
        </List>
      )}
      </FormControl >

      <FormControl style={{ width: '100%' }}>
        <InputLabel  
        error={submited && !data?.contact}
        required >
          Contato selecionado
        </InputLabel>
        <Select
          onChange={(event) => setData({ ...data, contact: event.target.value })}
          label="Contato"
          size="small"
          value={data.contact}
          style={{backgroundColor:"#fff"}}

          fullWidth
          required
          error={submited && !data?.contact}
        >
          {contacts.map((contact) => (
            <MenuItem key={contact.id} value={contact.id}>
              {contact.name} - {contact.cpf_cnpj}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>      

      <TwoColumnsContainer>          
        <TextFieldMask
            onChange={(event) =>
              setData({ ...data, value: formatCurrency(event.target.value) })
            }
            value={ data.value}
            id="outlined-basic"
            label="Valor R$"
            size="small"
                fullWidth
            placeholder="999,00"
            required
            error={submited && !data.value}
          />
        <FormControl sx={{ mt: submited && !data.tag && "0" }}>
          <InputLabel
            sx={{ mt: 0 }}
            error={submited && !data.tag}
            required
          >
            Tag inicial
          </InputLabel>
          <Select
            onChange={(event) => setData({ ...data, tag: event.target.value })}
            label="Tag"
            fullWidth
            size="small"
            required
            value={data.tag}
                error={submited && !data.tag}
          >
            <MenuItem value={"COLD"}>Fria</MenuItem>
            <MenuItem value={"WARM"}>Morna</MenuItem>
            <MenuItem value={"HOT"}>Quente</MenuItem>
          </Select>
        </FormControl>

      </TwoColumnsContainer>
      <FormControl sx={{ mt: 0 }}  fullWidth>
            <InputLabel
              error={submited && !data?.pipeline}
              required
            >
              Selecione um pipeline
            </InputLabel>
            <Select
              value={data.pipeline}
              onChange={(event) => {
                setData({ ...data, pipeline: event.target.value });
                // setSelectPipeline(formatListThisCompanyToSelect(event.target.value));
                  }}
              label="Selecione um pipeline"
              size="small"
              fullWidth
              required
              error={submited && !data?.pipeline}
            >
              <MenuItem value={"null"} disabled>Selecione um pipeline</MenuItem>
              {selectedPipelines.map((pipeline) => (
                <MenuItem key={pipeline.id} value={pipeline.id}>
                  {pipeline.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      <Tooltip
        title="Adicionar negociação"
        placement="top-start"
        enterDelay={500}
        leaveDelay={100}
      >
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
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
        open={createDealModalState}
        onClose={() => onClose()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalStyled>
    </>
  );
};
export default CreateDealModal;