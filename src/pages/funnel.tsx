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
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";
import FunnelCard from "ui/components/FunnelCard/FunnelCard";
import CreateFunnelModal from "ui/components/Modal/Funnel/CreateFunnelModal";
import { ContactsHeaderContainer } from "@styles/pagesStyle/contacts.style";
import { ButtonsContainer } from "@styles/pagesStyle/_app.syile";
import FunnelDetailModal from "ui/components/Modal/Funnel/FunnelDetailModal";
import { FaPlus } from "react-icons/fa";

interface FunnelPageProps {
  token: string;
  user: IUser;
}

function FunnelPage({ token, user }: FunnelPageProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  const [isAutorized, setIsAutorized] = useState(false);

  useEffect(() =>{;
    setIsAutorized(Automation)
  })

  
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user]);


  const {
    funnels,
    filteredFunnel,
    removeFiltered,
    getData,
    hasError,
    isLoading,
  } = useFunnelPage();

  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [selectListValues, setSelectListValues] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  //MODAL CONTROL
  const [openCreateFunnelModal, setOpenCreateFunnelModal] =
    React.useState(false);
  const [openDetailFunnelModal, setOpenDetailFunnelModal] =
    React.useState(false);
  const [selectedFunnel, setSelectedFunnel] = React.useState(
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
        filteredFunnel(event.target.value, valueType);
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

  // const {
  //   getPipelines,
  // } = useContext(PipelineContext);

  // useEffect(() => {
  //   getPipelines();
  // }, []);
  const handleChangeValueType = (event) => {
    setSearchTerm("");
    setValueType(event.target.value);
    if (event.target.value === "state") {
      const states = [];
      funnels.forEach((contact) => {
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
      <Payment/>
    ):(
        <CompanyPageContainer style={isAdmin? {} : { display:"none"}}>
      <Head>
        <title>Funis de vendas | Wave CRM</title>
      </Head>
      <CreateFunnelModal
        open={openCreateFunnelModal}
        setOpen={setOpenCreateFunnelModal}
        getData={getData}
      />
      <FunnelDetailModal
        open={openDetailFunnelModal}
        setOpen={setOpenDetailFunnelModal}
        funnel={selectedFunnel}
        getData={getData}
        isAdmin={user.role === "ADMIN"}
      />
      <ContactsHeaderContainer>
        <TitleContainer>
          <h1>Funis</h1>
        </TitleContainer>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          selectListValues={selectListValues}
          searchTypes={[
            { value: "name", name: "Nome" },
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
      <ButtonsContainer>
        <Tooltip
          title="Adicionar e-mail"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white", marginLeft: "10px", gap:"5px" }}
            onClick={() => setOpenCreateFunnelModal(true)}
          ><FaPlus/>
            Adicionar funil
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
            {!isLoading && !hasError && !funnels?.length && !hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>Nenhum canal foi encontrado</Typography>
                <Typography>Deseja adicionar um novo funil?</Typography>
                <Button
                  sx={{ my: 2, color: "white" }}
                  variant="contained"
                  color="success"
                  onClick={() => setOpenCreateFunnelModal(true)}
                >
                  Adicionar novo funil
                </Button>
              </div>
            )}

            {!isLoading && !hasError && !funnels?.length && hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>
                  Nenhum canal atende os parametros do filtro
                </Typography>
              </div>
            )}

            {funnels.map((automation) => (
              <FunnelCard
                key={automation.id}
                name={automation.name}
                description={automation.description}
                onClick={() => {
                  setSelectedFunnel(automation);
                  setOpenDetailFunnelModal(true);
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

export default FunnelPage;

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
