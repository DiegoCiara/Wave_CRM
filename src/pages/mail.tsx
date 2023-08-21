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
import { Mailer, Validator } from "data/validator";
import Payment from "./Payment";
import { useAutomationPage } from "data/services/hooks/PageHooks/AutomationHook";
import { AutomatiionTypes } from "types/Automation";
import AutomationDetailModal from "ui/components/Modal/Automation/AutomationDetailModal";
import { useMailerPage } from "data/services/hooks/PageHooks/MailerHook";
import { MailerTypes } from "types/Mailer";
import MailerCard from "ui/components/MailerCard/MailerCard";
import PipelineContext from "contexts/PipelineContext";
import MailerDetailModal from "ui/components/Modal/Mailer/MailerDetailModal";
import AutorizedMailer from "./AutorizedMailer";
import { ButtonsContainer } from "@styles/pagesStyle/_app.syile";
import { ContactsHeaderContainer } from "@styles/pagesStyle/contacts.style";
import CreateMailerModal from "ui/components/Modal/Mailer/CreateMailerModal";
import { FaPlus } from "react-icons/fa";

interface MailerPageProps {
  token: string;
  user: IUser;
}

function MailerPage({ token, user }: MailerPageProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  
  const [isAutorized, setIsAutorized] = useState(false);

  useEffect(() =>{
    setIsAutorized(Mailer)
  })

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user]);

  const {
    mailers,
    filteredMailer,
    removeFiltered,
    getData,
    hasError,
    isLoading,
  } = useMailerPage();

  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [selectListValues, setSelectListValues] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  //MODAL CONTROL
  const [openCreateMailerModal, setOpenCreateMailerModal] =
    React.useState(false);
  const [openDetailMailerModal, setOpenDetailMailerModal] =
    React.useState(false);
  const [selectedMailer, setSelectedMailer] = React.useState(
    {} as MailerTypes
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
        filteredMailer(event.target.value, valueType);
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

  const handleChangeValueType = (event) => {
    setSearchTerm("");
    setValueType(event.target.value);
    if (event.target.value === "subject") {
      const subjects = [];
      mailers.forEach((contact) => {
        const subject = subjects.some((subject) => subject.value === contact.subject);
        if (!subject) {
          subjects.push({ label: contact.subject, value: contact.subject });
        }
      });
      setSelectListValues(subjects);
    } else if (event.target.value === "title") {
        const titles = [];
        mailers.forEach((contact) => {
          const title = titles.some((title) => title.value === contact.title);
          if (!title) {
            titles.push({ label: contact.title, value: contact.title });
          }
        });
        setSelectListValues(titles);
      } else {
        setSelectListValues([]);
    }
  };
  
  const {
    getPipelines,
  } = useContext(PipelineContext);

  useEffect(() => {
    getPipelines();
  }, []);

  return (
    <>
    
        <CompanyPageContainer style={isAdmin? {}: {display:"none"}}>
      <Head>
        <title>E-mails | Wave CRM</title>
      </Head>
      <CreateMailerModal
        isAdmin={user.role === "ADMIN"}
        open={openCreateMailerModal}
        setOpen={setOpenCreateMailerModal}
        getData={getData}
      />
      <MailerDetailModal
        open={openDetailMailerModal}
        setOpen={setOpenDetailMailerModal}
        mailer={selectedMailer}
        getData={getData}
        isAdmin={user.role === "ADMIN"}
      />
      <ContactsHeaderContainer
      style={{ marginBottom: hasFiltered ? "55px" : "16px" }}
    >
        <h1>E-mails</h1>
      <SearchButtom
        placeholder="Buscar"
        buttomIcon="fa-search"
        viewButtonGroup={true}
        typeValue={valueType}
        searchTypes={[
          { value: "subject", name: "Assunto" },
          { value: "title", name: "Título" },
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
          title="Adicionar e-mail"
          placement="top-start"
          enterDelay={500}
          leaveDelay={100}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white", marginLeft: "10px" , gap:"5px"}}
            onClick={() => setOpenCreateMailerModal(true)}
            disabled={isAutorized}
          ><FaPlus/>
            Adicionar e-mail
          </Button>
        </Tooltip>
      </ButtonsContainer>
    </ContactsHeaderContainer>
    {isAutorized ? (
      <AutorizedMailer/>
    ):(
      <CardsContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <>
            {!isLoading && !hasError && !mailers?.length && !hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>Nenhum e-mail foi encontrado</Typography>
                <Typography>Deseja adicionar um novo e-mail?</Typography>
                <Button
                  sx={{ my: 2, color: "white" }}
                  variant="contained"
                  color="success"
                  onClick={() => setOpenCreateMailerModal(true)}
                >
                  Adicionar novo e-mail
                </Button>
              </div>
            )}

            {!isLoading && !hasError && !mailers?.length && hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>
                  Nenhum e-mail atende os parametros do filtro
                </Typography>
              </div>
            )}

            {mailers.map((mailer) => (
              <MailerCard
                key={mailer.id}
                subject={mailer.subject}
                title={mailer.title}
                text={mailer.template}
                onClick={() => {
                  setSelectedMailer(mailer);
                  setOpenDetailMailerModal(true);
                }}
              />
            ))}
          </>
        )}
      </CardsContainer>
  )}
    </CompanyPageContainer>

    </>
  );
}

export default MailerPage;

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
