import React, { useContext, useEffect, useState} from "react";
import {
  CircularProgress,
  Typography,
  Tooltip,
  Button,
  ButtonGroup, 
  FormControl,
  InputLabel,
  MenuItem,
  Select,

} from "@material-ui/core";
import {
  DealsHeaderContainer,
  DealsPageContainer,
  DealsTotalTagsContainer,
  PipelinesContainer,
  TitleHeaderContainer,
} from "@styles/pagesStyle/deals.style";
import DeleteModal from "ui/components/Modal/DeleteModal";
import UpDateModal from "ui/components/Modal/UpDateModal";
import CreateModal from "ui/components/Modal/CreateModal";
import CreateDealModal from "ui/components/Modal/CreateDealModal";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import { formatValue } from "data/utils/formatValue";
import DetailModal from "ui/components/Modal/DealDetailModal";
import CreateContactModalPipe from "ui/components/Modal/Contact/CreateContactModalPipe";
import { mockTags } from "data/utils/mock";
import { useCompanyPage } from "data/services/hooks/PageHooks/CompanyHook";
import { useContactPage } from "data/services/hooks/PageHooks/ContactHook";
import { DynamicPiline } from "data/services/servicesComponents/DynamicPipelines";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";
import { IUser } from "types/User";
import ContactContext from "contexts/ContactContext";
import { DragDropContext } from "react-beautiful-dnd";
import { experimentalStyled as styled } from "@material-ui/core/styles";

import { TitleStyled } from "ui/components/Title/Title.style";
import AuthContext from "contexts/AuthContext";
import { FaFileMedical, FaPlus, FaUserPlus, FaWhatsapp } from "react-icons/fa";
import { ImageContainer } from "@styles/pagesStyle/recover.styles";
import TitlePay from "ui/components/Title/TitlePay";
import { Validator } from 'data/validator'
import Payment from "./Payment";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { ContactsHeaderContainer } from "@styles/pagesStyle/contacts.style";
import { ButtonsContainer } from "@styles/pagesStyle/_app.syile";
import { CardsContainer, TitleContainer } from "@styles/pagesStyle/company.style";
import PipelineContext from "contexts/PipelineContext";
import DealPipeline, { DragDropContextContainer } from "ui/components/DealComponents/DealPipeline/DealPipeline";
import DealCardList from "ui/components/DealComponents/DealCard/DealCardList";
import { ListGrid } from "ui/components/DealComponents/DealCard/DealCard.style";
import { useFunnelPage } from "data/services/hooks/PageHooks/FunnelHooks";
import FunnelCard from "ui/components/FunnelCard/FunnelCard";
import { useUserPage } from "data/services/hooks/PageHooks/UserHook";
import CreateFunnelModal from "ui/components/Modal/Funnel/CreateFunnelModal";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";

interface MainPageProps {
  token: string;
  user: IUser;
}

function MainPage({ token, user }: MainPageProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  const [isAdplent, setIsAdplent] = useState(false);

  useEffect(() =>{
    setIsAdplent(Validator)
  })


  const {
    hasError,
    isLoading,
    dealTotalParams,
    filterDeals,
    removefilterDeals,
    getPipelines,
    pipelines,
    dealsList, 
    onDragEnd,
    UseCreateModal,
    UseCreateDealModal,
  } = useContext(PipelineContext);

  useEffect(() => {
    getPipelines();
  }, []);

  const [valueType, setValueType] = React.useState("name");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectListValues, setSelectListValues] = React.useState([]);
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [time, setTime] = React.useState(null);
  const { formatCompaniesToSelect } = useCompanyPage();
  const { formatContactToSelect } = useContactPage();
  const { formatUsersToSelect } = useUserPage();
  const {
    useCreateContactModalPipe
  } = useContext(ContactContext);


  const handleChangeValueType = (event) => {
    setSearchTerm("");
    setValueType(event.target.value);
    if (event.target.value === "tag") {
      setSelectListValues(mockTags);
    } else if (event.target.value === "company") {
      setSelectListValues(formatCompaniesToSelect);
    } else if (event.target.value === "contact") {
      setSelectListValues(formatContactToSelect);
    } else if (event.target.value === "user") {
      setSelectListValues(formatUsersToSelect);
    } else {
      setSelectListValues([]);
    }
  };



  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setIsAdmin(true);
    }
  }, [user]);

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

  const removeFilters = () => {
    removefilterDeals(false);
    setHasFiltered(false);
    setSearchTerm("");
  }; 

  
  const [viewButtonGroup, setViewButtonGroup] = useState(false);

  // Função que filtra os funis que os pipelines participam

  const { funnels, getData } = useFunnelPage()
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
      return pipeline.funnel?.id === selectedFunnelId;
    } else {
      return listKey.name === selectedPipelineName || selectedPipelineName === '';
    }
  })
  

  const [funnelSelected, setFunnelSelected] = useState(null);
// ...

useEffect(() => {
  setSelectedFunnelId(selectedFunnelId);
}, [selectedFunnelId]);


const [openCreateFunnelModal, setOpenCreateFunnelModal] =
React.useState(false);
// ...
// ...

  return (
    <>
     {isAdplent ? (
      <Payment/>
    ):(
      <DealsPageContainer>
      <Head>
        <title>Negociações | Wave CRM</title>
      </Head>

      <DeleteModal getData={getPipelines} />
      <UpDateModal getData={getPipelines} />
      <CreateModal getData={getPipelines} funnelSelect={selectedFunnelId} />
      <CreateContactModalPipe/>
      <CreateDealModal getData={getPipelines} selectedPipelines={filteredPipelines} />
      <DetailModal getData={getPipelines} />      
      <CreateFunnelModal
        open={openCreateFunnelModal}
        setOpen={setOpenCreateFunnelModal}
        getData={getData}
      />

      <ContactsHeaderContainer
        style={{ marginBottom: hasFiltered ? "55px" : "16px"}}
      >
              <div
                className="HeadAjust"
              >
                <h2 style={{margin:"0", display:"flex", gap:"10px", width:"auto"}}>Pipelines
                  <FormControl fullWidth>
                      <InputLabel  htmlFor="uncontrolled-native">
                        Funil
                      </InputLabel>
                      <Select
                        sx={{backgroundColor:'#fff', width:"100%"}}
                        size="small"
                        label="Funil"
                        value={selectedFunnelId}
                      onChange={handleFunnelIdChange}
                      >
                        <MenuItem value={null} disabled>Selecione um funil</MenuItem>
                        {funnels.map(( index) => (
                          <MenuItem key={index.id} value={index.id}>
                            {index.name}
                          </MenuItem>
                        ))}
                      </Select>                
                  </FormControl>
                </h2>
              
                <div style={{display:"flex", justifyContent: "start", gap:"10px", alignItems:"center"}}>
                <Tooltip
                  title="Valor total"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <Typography style={{color: '#009650', fontWeight: 700}}>
                    {formatValue(dealTotalParams?.budgetSum)}
                  </Typography>
                </Tooltip>
                <TbPointFilled/>
                <Tooltip
                  title="Total de negociações"
                  placement="top-start"
                  enterDelay={500}
                  leaveDelay={100}
                >
                  <Typography>
                    <b  style={{color: '#0025f8'}}>{dealTotalParams?.totalDeals}</b> negociações
                  </Typography>
                </Tooltip>
                </div>
              </div>
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
            { value: "name", name: "Negociação" },
            { value: "contact", name: "Contato" },
            { value: "company", name: "Canal" },
            { value: "tag", name: "Tag" },
            { value: isAdmin? "user" : null , name: isAdmin? "Usuário" : null },
          ]}
          ChangeType={(event) => {
            handleChangeValueType(event);
          }}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            handleChangeSearchTerm(event);
          }}
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
              style={{ color: "white", gap:"5px" }}
              onClick={() => useCreateContactModalPipe()}
            ><FaUserPlus style={{fontSize:"16px"}}/>
              Contato
            </Button>
          </Tooltip>

          <Tooltip
            title="Adicionar negociação"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white", marginLeft: "10px", gap:"5px" }}
            onClick={() => UseCreateDealModal()}
          >
            <BsFillFileEarmarkPlusFill style={{fontSize:"16px"}}/> Negociação
          </Button>
          </Tooltip>
          <Tooltip
            title="Adicionar etapa"
            placement="top-start"
            enterDelay={500}
            leaveDelay={100}
          >
            <Button
              variant="contained"
              color="primary"
              style={ isAdmin? { color: "white", marginLeft: "10px", gap:"5px"  }: {display: "none"}}
              onClick={() => UseCreateModal()}
            ><FaPlus/> 
              Pipeline
            </Button>
          </Tooltip>
        </ButtonsContainer>
      </ContactsHeaderContainer>
      <PipelinesContainer>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : !isLoading && hasError ? (
          <div>{hasError}</div>
        ) : (
          <>
              <DragDropContextContainer>
              <DragDropContext onDragEnd={onDragEnd}>
              {selectedFunnelId === '' && 
                    <CardsContainer>
              {isLoading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress />
                </div>
              ) : !isLoading && hasError ? (
                <div>{hasError}</div>
              ) : (
                <>      
                  {funnels.map((automation) => (
                    <FunnelCard
                      key={automation.id}
                      name={automation.name}
                      description={automation.description}
                      onClick={() => {
                        setSelectedFunnelId(automation.id);
                      }}
                    />
                  ))}
                </>
              )}
            </CardsContainer>
      
              }
                {selectedFunnelId !== '' && (
                  <ListGrid>
                    {!filteredPipelines.length && !isLoading && !hasError && (
                      <div style={{ textAlign: "center" }}>
                        <Typography>Nenhum pipeline foi encontrado</Typography>
                        <Typography>Deseja adicionar um novo pipeline?</Typography>
                        <Button
                          sx={{ my: 2, color: "white" }}
                          variant="contained"
                          color="success"
                          onClick={() => UseCreateModal()}
                        >
                          Adicionar novo pipeline
                        </Button>
                      </div>
                    )}
                    {filteredPipelines.map((listKey) => (
                      <DealCardList
                        elements={listKey.deals}
                        key={listKey.id}
                        title={listKey.name}
                        subtitle={listKey.description}
                        pipeId={listKey.id}
                        totalColumnValue={listKey.totalColumnValue}
                      />
                    ))}
                  </ListGrid>
        )}              </DragDropContext>
            </DragDropContextContainer>
          </>
        )}
      </PipelinesContainer>
    </DealsPageContainer>
)}

    </>
  );
}

export default MainPage;

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
