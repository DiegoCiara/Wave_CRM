import { useEffect, useState } from "react";
import CompanyService from "data/services/CompanyService";
import { CompanyTypes } from "types/Company";
import AutomationService from "data/services/AutomationService";
import { IProduct } from "types/Product";
import FunnelService from "data/services/FunnelService";
import ProductService from "data/services/ProductService";

export const useProductPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [products, setProducts] = useState([]);
  const [removeFilteredProducts, setFilteredProducts] = useState([]);
  const [formatProductsToSelect, setFormat] = useState([]);
  const [createProductModalState, setCreateProductModalState] =
    useState<boolean>(false);
  const [productDetail, setProductDetail] = useState<IProduct>({});
  const [hasError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!products.length) {
      getData();
    }
  }, []);

  const formatListToSelect = (products: any[]): any => {
    setFormat(
      products.map((product) => {
        return { value: product.id, label: product.name };
      })
    );
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getProducts();
      setProducts(response);
      setFilteredProducts(response);
      formatListToSelect(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        "Não foi possivel buscar os canais, verifique sua conexão e tente novamente"
      );
    }
  };

  const filteredProduct = async (terms: string, typeValue: string) => {
    let filtered = [];
    if (typeValue === "name") {
      filtered = products.filter((product: IProduct) =>
      product.name.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    }

    setProducts(filtered);
  };

  const removeFiltered = async (isNewSearched: boolean) => {
    getData();
  };

  const createProduct = async (data: IProduct) => {
    const result = await ProductService.createProduct(data);
    return result;
  };

  const useCreateProductModal = () => {
    setCreateProductModalState(!createProductModalState);
  };

  const useProductDetailModal = (ProductDetail: any) => {
    setProductDetail(ProductDetail);
  };

  const editProduct = async (ProductId: any, data: any) => {
    const result = await ProductService.editProduct(ProductId, data);
    return result;
  };

  const deleteProduct = async (ProductId: any) => {
    const result = await ProductService.deleteProduct(ProductId);
    return result;
  };

  return {
    products,
    setProducts,
    formatProductsToSelect,
    filteredProduct,
    removeFiltered,
    // CREATE MODAL
    createProduct,
    useCreateProductModal,
    createProductModalState,
    setCreateProductModalState,
    setProductDetail,
    useProductDetailModal,
    editProduct,
    productDetail,
    deleteProduct,
    getData,
    hasError,
    isLoading,
  };
};
