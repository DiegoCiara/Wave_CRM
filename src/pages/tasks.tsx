/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState, useEffect } from "react";
import {
  CardsContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import Title from "ui/components/Title/Title";
import {
  ContactsHeaderContainer,
  ContactsPageContainer,
} from "@styles/pagesStyle/contacts.style";
import ContactCard from "ui/components/ContactCard/ContactCard";
import CreateContactModal from "ui/components/Modal/Contact/CreateContactModal";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import {
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import UpdateContactModal from "ui/components/Modal/Contact/UpdateContactModal";
import DeleteContactModal from "ui/components/Modal/Contact/DeleteContactModal";
import ImportContactModal from "ui/components/Modal/Contact/ImportContactModal";
import ContactContext from "contexts/ContactContext";
import Head from "next/head";
import { ButtonsContainer } from "@styles/pagesStyle/_app.syile";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";
import { IUser } from "types/User";
import { Validator } from "data/validator";
import Payment from "./Payment";
import PipelineContext from "contexts/PipelineContext";
import { FaPlus } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import Activity from "ui/components/Activity/Activity";
import DealsService from "data/services/DealsService";

interface ContactPageProps {
  token: string;
  user: IUser;
}

function ContactPage({ token, user }: ContactPageProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
  const {
    dealsList, 
    pipelines,
    deals,
    getPipelines 
  } = useContext(PipelineContext);

  const activitys = deals.activity

  useEffect(() => {
    getPipelines();
  }, []);

  
  const [isAdplent, setIsAdplent] = useState(false);

  useEffect(() =>{
    setIsAdplent(Validator)
  })

  const { formatCompaniesToSelect } = useCompanyPage();
  const [valueType, setValueType] = useState("name");
  const [hasFiltered, setHasFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectListValues, setSelectListValues] = React.useState([]);
  const [time, setTime] = useState(null);
  const [selectedId, setSelectedId] = useState<string>("");

  const { 
    useImportContactModal,
    useCreateContactModal,
    useUpdateContactModal,
    isLoading,
    hasError,
    getContacts,
    filteredContact,
    removeFiltered,
    contacts,
  } = useContext(ContactContext);

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

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);

    if (time) {
      clearTimeout(time);
      setTime(null);
    }

    setTime(
      setTimeout(() => {
        filteredContact(event.target.value, valueType);
        setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  const removeFilters = () => {
    removeFiltered();
    setHasFiltered(false);
    setSearchTerm("");
  };

  const setId = () => {
    setSelectedId("");
  };

  return (
    <>
      
     {isAdplent ? (
      <Payment/>
    ):(
        <ContactsPageContainer>
      <Head>
        <title>Contatos | Wave CRM</title>
      </Head>
      <CreateContactModal />
      <ImportContactModal
        getData={getContacts}
        companies={formatCompaniesToSelect}
      />
      {selectedId ? (
        <UpdateContactModal
          setId={setId}
          id={selectedId}
          getData={getContacts}
          isAdmin={user.role === "ADMIN"}
        />
      ) : null}
      <DeleteContactModal id={selectedId} />
      <ContactsHeaderContainer
        style={{ marginBottom: hasFiltered ? "55px" : "16px" }}
      >
          <h1>Contatos</h1>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          searchTypes={[
            { value: "name", name: "Nome" },
            // { value: "cpf_cnpj", name: "CPF/CNPJ" },
            
            { value: "company", name: "Canal" },
            { value: "city", name: "Cidade" },
            { value: "state", name: "Estado" },
          ]}
          ChangeType={(event) => {
            handleChangeValueType(event);
          }}
          onChange={(event) => {
            handleChangeSearchTerm(event);
          }}
          selectListValues={selectListValues}
          value={searchTerm}
          onClick={removeFilters}
          hasFiltered={hasFiltered}
        />
        <ButtonsContainer>
          <Tooltip
            title="Importar contatos"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              color="primary"
              style={{gap:"5px"}}
              onClick={() => useImportContactModal()}
            ><MdCloudUpload/>
              Importar
            </Button>
          </Tooltip>

          <Tooltip
            title="Adicionar contato"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              color="success"
              style={{ color: "white", marginLeft: "10px" , gap:"5px"}}
              onClick={() => useCreateContactModal()}
            ><FaPlus/>
              Adicionar
            </Button>
          </Tooltip>
        </ButtonsContainer>
      </ContactsHeaderContainer>
      <CardsContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <>
            {!isLoading && !hasError && !contacts?.length && !hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>Nenhum contato foi encontrado</Typography>
                <Typography>Deseja adicionar um novo contato?</Typography>
                <Button
                  sx={{ my: 2, color: "white" }}
                  variant="contained"
                  color="success"
                  onClick={() => useCreateContactModal()}
                >
                  Adicionar novo contato
                </Button>
              </div>
            )}

            {!isLoading && !hasError && !contacts?.length && hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>
                  Nenhum contato atende os parametros do filtro
                </Typography>
              </div>
            )}
            
            {activitys.map((act) => (
              <Activity
                key={act.createdAt}
                title={act.name}
                tag={act.tag}
                createdAt={act.createdAt}
                createdBy={act.createdBy.name}
                description={act.description}
              />
            ))}
          </>
        )}
      </CardsContainer>
    </ContactsPageContainer>
    )}
    </>
  );
}

export default ContactPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
}): Promise<any> => {
  const data = parseCookies(req);
  let token: string = "";
  let user: any = {};

  Object.keys(data).find((key, i) => {
    if (key === "@target:token") {
      token = Object.values(data)[i];
    }
    if (key === "@target:user") {
      user = Object.values(data)[i];
    }
  });
  if (!token?.length && resolvedUrl !== "/login") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    try {
      serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await serviceApi.get("/auth/faw1efawe3f14aw8es3v6awer51xx3/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  if (user) {
    user = JSON.parse(user);
  }
  return {
    props: {
      user,
      token,
    },
  };
};
