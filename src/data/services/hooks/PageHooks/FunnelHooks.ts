import { useEffect, useState } from "react";
import CompanyService from "data/services/CompanyService";
import { CompanyTypes } from "types/Company";
import AutomationService from "data/services/AutomationService";
import { Funnel } from "types/Funnel";
import FunnelService from "data/services/FunnelService";

export const useFunnelPage = () => {
  //DECLARAÇÃO DAS VARIAVEIS
  const [funnels, setFunnels] = useState([]);
  const [removeFilteredFunnels, setFilteredFunnels] = useState([]);
  const [formatFunnelsToSelect, setFormat] = useState([]);
  const [createFunnelModalState, setCreateFunnelModalState] =
    useState<boolean>(false);
  const [funnelDetail, setFunnelDetail] = useState<Funnel>({});
  const [hasError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!funnels.length) {
      getData();
    }
  }, []);

  const formatListToSelect = (funnels: any[]): any => {
    setFormat(
      funnels.map((funnel) => {
        return { value: funnel.id, label: funnel.name };
      })
    );
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await FunnelService.getFunnels();
      setFunnels(response);
      setFilteredFunnels(response);
      formatListToSelect(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        "Não foi possivel buscar os canais, verifique sua conexão e tente novamente"
      );
    }
  };

  const filteredFunnel = async (terms: string, typeValue: string) => {
    let filtered = [];
    if (typeValue === "name") {
      filtered = funnels.filter((funnel: Funnel) =>
      funnel.name.toLowerCase().includes(terms.toLocaleLowerCase())
      );
    }

    setFunnels(filtered);
  };

  const removeFiltered = async (isNewSearched: boolean) => {
    getData();
  };

  const createFunnel = async (data: Funnel) => {
    const result = await FunnelService.createFunnel(data);
    return result;
  };

  const useCreateFunnelModal = () => {
    setCreateFunnelModalState(!createFunnelModalState);
  };

  const useFunnelDetailModal = (FunnelDetail: any) => {
    setFunnelDetail(FunnelDetail);
  };

  const editFunnel = async (FunnelId: any, data: any) => {
    const result = await FunnelService.editFunnel(FunnelId, data);
    return result;
  };

  const deleteFunnel = async (FunnelId: any) => {
    const result = await FunnelService.deleteFunnel(FunnelId);
    return result;
  };

  return {
    funnels,
    setFunnels,
    formatFunnelsToSelect,
    filteredFunnel,
    removeFiltered,
    // CREATE MODAL
    createFunnel,
    useCreateFunnelModal,
    createFunnelModalState,
    setCreateFunnelModalState,
    setFunnelDetail,
    useFunnelDetailModal,
    editFunnel,
    funnelDetail,
    deleteFunnel,
    getData,
    hasError,
    isLoading,
  };
};
