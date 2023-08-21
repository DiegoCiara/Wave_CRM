import React, { useContext, useEffect, useState } from "react";
import {
  CardsContainer,
  CompanyHeaderContainer,
  CompanyPageContainer,
  NewCompanyButtonContainer,
  TitleContainer,
} from "@styles/pagesStyle/company.style";
import SearchButtom from "ui/components/SearchButton/SearchButton";
import {
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";
import { IUser } from "types/User";
import { Automation, Validator } from "data/validator";
import Payment from "./Payment";
import { AutomatiionTypes } from "types/Automation";
import { ContactsHeaderContainer } from "@styles/pagesStyle/contacts.style";
import { ButtonsContainer } from "@styles/pagesStyle/_app.syile";
import { FaPlus } from "react-icons/fa";
import ProductCard from "ui/components/ProductCard/ProductCard";
import { useProductPage } from "data/services/hooks/PageHooks/ProductHook";
import CreateProductModal from "ui/components/Modal/Products/CreateProductModal";
import { BsBoxSeamFill } from "react-icons/bs";
import ProductDetailModal from "ui/components/Modal/Products/ProductDetailModal";

interface ProductPageProps {
  token: string;
  user: IUser;
}

function ProductPage({ token, user }: ProductPageProps) {
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
    products,
    filteredProduct,
    removeFiltered,
    getData,
    hasError,
    isLoading,
  } = useProductPage();

  const [valueType, setValueType] = React.useState("name");
  const [hasFiltered, setHasFiltered] = React.useState(false);
  const [selectListValues, setSelectListValues] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  //MODAL CONTROL
  const [openCreateProductModal, setOpenCreateProductModal] =
    React.useState(false);
  const [openDetailProductModal, setOpenDetailProductModal] =
    React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(
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
        filteredProduct(event.target.value, valueType);
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
      products.forEach((contact) => {
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
        <title>Produtos | Wave CRM</title>
      </Head>
      <CreateProductModal
        open={openCreateProductModal}
        setOpen={setOpenCreateProductModal}
        getData={getData}
      />
      <ProductDetailModal
        open={openDetailProductModal}
        setOpen={setOpenDetailProductModal}
        Product={selectedProduct}
        getData={getData}
        isAdmin={user.role === "ADMIN"}
      />
      <ContactsHeaderContainer>
        <TitleContainer>
          <h1><BsBoxSeamFill style-={{margin:"0"}}/> Produtos</h1>
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
            onClick={() => setOpenCreateProductModal(true)}
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
            {!isLoading && !hasError && !products?.length && !hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>Nenhum canal foi encontrado</Typography>
                <Typography>Deseja adicionar um novo funil?</Typography>
                <Button
                  sx={{ my: 2, color: "white" }}
                  variant="contained"
                  color="success"
                  onClick={() => setOpenCreateProductModal(true)}
                >
                  Adicionar novo funil
                </Button>
              </div>
            )}

            {!isLoading && !hasError && !products?.length && hasFiltered && (
              <div style={{ textAlign: "center" }}>
                <Typography>
                  Nenhum canal atende os parametros do filtro
                </Typography>
              </div>
            )}

            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                value={product.value}
                description={product.description}
                onClick={() => {
                  setSelectedProduct(product);
                  setOpenDetailProductModal(true);
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

export default ProductPage;

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
