import React, { useEffect, useState } from "react";
import {
  CardsContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import {
  CompletedButtonsContainer,
  CompletedHeaderContainer,
  CompletedPageContainer,
} from "@styles/pagesStyle/completed.style";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useCompletedPage } from "data/services/hooks/PageHooks/CompletedHook";
import DealCompletedCard from "ui/components/DealCompletedCard/DealCompletedCard";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { DealTypes } from "types/Deal";
import AchivedDealModal from "ui/components/Modal/Completed/ArchivedModal";
import CompletedDealModal from "ui/components/Modal/Completed/CompletedModal";
import Title from "ui/components/Title/Title";
import { StatusTypes } from "types/Status";
import Head from "next/head";
import { parseCookies } from "data/services/cookie";
import { GetServerSideProps } from "next";
import { serviceApi } from "data/services/ServiceApi";
import { IUser } from "types/User";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";

interface CompletedPageProps {
  token: string;
  user: IUser;
}

function CompletedPage({ token, user }: CompletedPageProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const {
    deals,
    filterDeals,
    removefilterDeals,
    getData,
    isLoading,
    hasError,
  } = useCompletedPage();
  const [valueType, setValueType] = useState("name");
  const [hasFiltered, setHasFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [time, setTime] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = useState("WON");
  const [selectListValues, setSelectListValues] = useState([]);
  const [dealsList, setDealsList] = useState([]);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatContactToSelect } = useContactPage();
  const [openAchivedModal, setOpenAchivedModal] = useState(false);

  //* WORKING
  const [openCompletedModal, setOpenCompletedModal] = useState(false);

  //* ------ |

  const [selectedDeal, setSelectedDeal] = useState<DealTypes>({});
  const [finishedBy, setFinishedBy] = useState("");
  const [status, setStatus] = useState<StatusTypes>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de itens por página

  useEffect(() => {
    if (!deals.length) {
      getData();
    }
  }, []);

  const handleChangeValueType = (event) => {
    setSearchTerm("");
    setValueType(event.target.value);
    if (event.target.value === "company") {
      setSelectListValues(formatCompaniesToSelect);
    } else if (event.target.value === "contact") {
      setSelectListValues(formatContactToSelect);
    } else {
      setSelectListValues([]);
    }
 };

  const handleChangeSearchTerm = (event) => {
    let resetFilter = false;
    if (hasFiltered) {
      resetFilter = true;
    }
    setSearchTerm(event.target.value);
    if (time) {
      clearTimeout(time);
      setTime(null);
    }
    setTime(
      setTimeout(() => {
        filterDeals(event.target.value, valueType, resetFilter);
        setHasFiltered(true);
      }, 1000)
    );
    clearTimeout(time);
  };

  useEffect(() => {
    if (deals) {
      setDealsList(deals.filter((deal) => deal.status === selectedStatus));
    }
  }, [deals, selectedStatus]);

  const removeFilters = () => {
    removefilterDeals();
    setHasFiltered(false);
    setSearchTerm("");
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedStatus(newValue);
  };

  const handleClick = (deal) => {
    setFinishedBy(deal.activity[0].createdBy.name);
    setSelectedDeal(deal);
    setOpenAchivedModal(true);
  };

  useEffect(() => {
    if (status.type) {
      const i = deals.indexOf(selectedDeal);
      deals.splice(i, 1);
      setTimeout(() => {
        setStatus({});
      }, 3000);
    }
  }, [status]);

  // Lógica de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dealsList.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <CompletedPageContainer>
      <Head>
        <title>Finalizadas | Wave CRM</title>
      </Head>

      <AchivedDealModal
        open={openAchivedModal}
        setOpen={setOpenAchivedModal}
        deal={selectedDeal}
        setStatus={setStatus}
        getDealsData={getData}
        isAdmin={user.role === "ADMIN"}
        finishedBy={finishedBy}
      />

      {deals && (
        <CompletedDealModal
          open={openCompletedModal}
          setOpen={setOpenCompletedModal}
          deal={selectedDeal}
          setStatus={setStatus}
          finishedBy={finishedBy}
        />
      )}
      <CompletedHeaderContainer>
        <h1>Negociações finalizadas</h1>
        <SearchButtom
          placeholder="Buscar"
          buttomIcon="fa-search"
          viewButtonGroup={true}
          typeValue={valueType}
          value={searchTerm}
          selectListValues={selectListValues}
          hasFiltered={hasFiltered}
          onClick={removeFilters}
          searchTypes={[
            { value: "name", name: "Nome" },
            { value: "company", name: "Canal" },
            { value: "contact", name: "Contato" },
          ]}
          ChangeType={(event) => {
            handleChangeValueType(event);
          }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            handleChangeSearchTerm(event);
          }}
        />
      </CompletedHeaderContainer>
      <CompletedButtonsContainer>
        <BottomNavigation
          value={selectedStatus}
          onChange={handleChange}
          showLabels
        >
          <Tooltip
            title="Visualizar convertidas"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <BottomNavigationAction
              label="Convertidas"
              value="WON"
              sx={{ color:selectedStatus === "WON" && "#00D34D" }}
              icon={
                <BsFillCheckCircleFill
                  style={{ color: selectedStatus === "WON" && "#00D34D" }}
                />
              }
            />
          </Tooltip>

          <Tooltip
            title="Visualizar perdidas"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <BottomNavigationAction
              label="Perdidas"
              value="LOST"
              sx={{ color: selectedStatus === "LOST" && "#f51d1d" }}
              icon={
                <FaTimesCircle
                  style={{ color: selectedStatus === "LOST" && "#f51d1d" }}
                />
              }
            />
          </Tooltip>

          <Tooltip
            title="Visualizar arquivadas"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <BottomNavigationAction
              label="Arquivadas"
              value="ARCHIVED"
              sx={{ color: selectedStatus === "ARCHIVED" && "#3a3a3a" }}
              icon={
                <IoMdArchive
                  style={{ color: selectedStatus === "ARCHIVED" && "#3a3a3a" }}
                />
              }
            />
          </Tooltip>
        </BottomNavigation>
      </CompletedButtonsContainer>
      <CardsContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <>
            {!currentItems?.length && !isLoading && !hasError && !hasFiltered && (
              <Typography sx={{ textAlign: "center" }}>
                Nenhuma negociação{" "}
                {selectedStatus === "WON"
                  ? "CONVERTIDA"
                  : selectedStatus === "LOST"
                  ? "PERDIDA"
                  : "ARQUIVADA"}{" "}
                foi encontrada
              </Typography>
            )}

            {!isLoading && !hasError && !currentItems?.length && hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>
                  Nenhuma negociação atende os parâmetros do filtro
                </Typography>
              </div>
            )}

            {currentItems.map((deal) => (
              <DealCompletedCard
                key={deal.id}
                title={deal.name}
                companyName={deal.company?.name}
                contactName={deal.contact?.socialName}
                companyPicture={deal.company?.picture}
                budget={deal.value}
                startDate={deal.createdAt}
                status={deal.status}
                onClick={() => {
                  handleClick(deal);
                }}
              />
            ))}
          </>
        )}
      </CardsContainer>

      {/* Renderizar botões de paginação */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Página anterior
        </Button>
        <Button
          onClick={nextPage}
          disabled={indexOfLastItem >= dealsList.length}
        >
          Próxima página
        </Button>
      </div>
    </CompletedPageContainer>
  );
}

export default CompletedPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
}): Promise<any> => {
  const data = parseCookies(req);
  let token: string = "";
  let user: any = {};

  Object.keys(data).find((key, i) => {
    if(key === "@target:token") {
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
