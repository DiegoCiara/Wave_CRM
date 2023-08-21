import React, { useContext, useEffect, useState } from "react";
import {
  CardsContainer,
  CompanyHeaderContainer,
  CompanyPageContainer,
  NewCompanyButtonContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import CompanyCard from "ui/components/AutomationCard/AutomationCard";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import { ButtonsContainer } from "@styles/pagesStyle/_app.syile";
import Title from "ui/components/Title/Title";
import {
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CreateAutomationModal from "ui/components/Modal/Automation/CreateAutomationModal";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import CompanyDetailModal from "ui/components/Modal/CompanyDetailModal";
import { CompanyTypes } from "types/Company";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";
import { IUser } from "types/User";
import { Automation, Validator } from "data/validator";
import Payment from "./Payment";
import { useAutomationPage } from "data/services/hooks/PageHooks/AutomationHook";
import { AutomatiionTypes } from "types/Automation";
import AutomationDetailModal from "ui/components/Modal/Automation/AutomationDetailModal";
import AutomationCard from "ui/components/AutomationCard/AutomationCard";
import PipelineContext from "contexts/PipelineContext";
import AutorizedAutomation from "./AutorizedAutomation";
import { ContactsHeaderContainer } from "@styles/pagesStyle/contacts.style";
import { FaPlus } from "react-icons/fa";

interface AutomationPageProps {
  token: string;
  user: IUser;
}

function AutomationPage({ token, user }: AutomationPageProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  
  const [isAutorized, setIsAutorized] = useState(false);


  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user]);

  
  useEffect(() =>{;
    setIsAutorized(Automation)
  })

  const {
    automations,
    filteredAutomation,
    removeFiltered,
    getData,
    hasError,
    isLoading,
  } = useAutomationPage();

  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [selectListValues, setSelectListValues] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  //MODAL CONTROL
  const [openCreateAutomationModal, setOpenCreateAutomationModal] =
    React.useState(false);
  const [openDetailAutomationModal, setOpenDetailAutomationModal] =
    React.useState(false);
  const [selectedAutomation, setSelectedAutomation] = React.useState(
    {} as AutomatiionTypes
  );
  const [time, setTime] = React.useState(null);

  const handleChangeSearchTerm = (event) => {
    if (hasFiltered) {
      removeFiltered(true);
    }
    setSearchTerm(event.target.value);
    if (time) {
      clearTimeout(time);
      setTime(null);
    }
    setTime(
      setTimeout(() => {
        filteredAutomation(event.target.value, valueType);
        setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  const removeFilters = () => {
    removeFiltered(false);
    setHasFiltered(false);
    setSearchTerm("");
  };

  const {
    getPipelines,
  } = useContext(PipelineContext);

  useEffect(() => {
    getPipelines();
  }, []);
  const handleChangeValueType = (event) => {
    setSearchTerm("");
    setValueType(event.target.value);
    if (event.target.value === "state") {
      const states = [];
      automations.forEach((contact) => {
        const state = states.some((state) => state.value === contact.state);
        if (!state) {
          states.push({ label: contact.state, value: contact.state });
        }
      });
      setSelectListValues(states);
    } else {
      setSelectListValues([]);
    }
  };

  return (
    <>
    
    {isAutorized ? (
      <AutorizedAutomation/>
    ):(
        <CompanyPageContainer style={isAdmin? {}:{display:"none"}}>
      <Head>
        <title>Automações | Wave CRM</title>
      </Head>
      <CreateAutomationModal
        open={openCreateAutomationModal}
        setOpen={setOpenCreateAutomationModal}
        getData={getData}
      />
      <AutomationDetailModal
        open={openDetailAutomationModal}
        setOpen={setOpenDetailAutomationModal}
        automation={selectedAutomation}
        getData={getData}
        isAdmin={user.role === "ADMIN"}
      />      
      <ContactsHeaderContainer
      style={{ marginBottom: hasFiltered ? "55px" : "16px" }}
    >
        <h1>Automações</h1>
      <SearchButtom
        placeholder="Buscar"
        buttomIcon="fa-search"
        viewButtonGroup={true}
        typeValue={valueType}
        searchTypes={[
          { value: "name", name: "Nome" },
          // { value: "company", name: "Canal" },
          // { value: "city", name: "Cidade" },
          // { value: "state", name: "Estado" },
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
          title="Adicionar contato"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white", marginLeft: "10px", gap:"5px" }}
            onClick={() => setOpenCreateAutomationModal(true)}
          ><FaPlus/>
            Adicionar automação
          </Button>
        </Tooltip>
      </ButtonsContainer>
    </ContactsHeaderContainer>

      {/* <CompanyHeaderContainer>
        <TitleContainer>
          <h1>Automações</h1>
        </TitleContainer>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          selectListValues={selectListValues}
          searchTypes={[
            { value: "name", name: "Nome" },
            { value: "input", name: "Gatilho" },
            { value: "output", name: "Ação" },
          ]}
          ChangeType={(event) => {
            handleChangeValueType(event);
          }}
          onChange={(event) => {
            handleChangeSearchTerm(event);
          }}
          value={searchTerm}
          onClick={removeFilters}
          hasFiltered={hasFiltered}
        />
      </CompanyHeaderContainer> */}
      <CardsContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <>
            {!isLoading && !hasError && !automations?.length && !hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>Nenhuma automação foi encontrada</Typography>
                <Typography>Deseja adicionar uma nova automação?</Typography>
                <Button
                  sx={{ my: 2, color: "white" }}
                  variant="contained"
                  color="success"
                  onClick={() => setOpenCreateAutomationModal(true)}
                >
                  Adicionar nova automação
                </Button>
              </div>
            )}

            {!isLoading && !hasError && !automations?.length && hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>
                  Nenhuma automação atende os parametros do filtro
                </Typography>
              </div>
            )}

            {automations.map((automation) => (
              <AutomationCard
                key={automation.id}
                name={automation.name}
                input={automation.input}
                output={automation.action}
                onClick={() => {
                  setSelectedAutomation(automation);
                  setOpenDetailAutomationModal(true);
                }}
              />
            ))}
          </>
        )}
      </CardsContainer>
    </CompanyPageContainer>
  )}

    </>
  );
}

export default AutomationPage;

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
