import { DealTypes } from "./Deal";

export default interface ModalTypes {
  createModalState: boolean;
  UseCreateModal: () => void;
  createPipeline: (name: string, description: string, funnel: string) => Promise<void>;

  updateModalState: boolean;
  UseUpdateModal: (id: string) => void;
  updatePipeline: (name: string, description: string) => Promise<void>;

  deleteModalState: boolean;
  UseDeleteModal: (id: string) => void;
  deletePipeline: () => Promise<void>;

  createDealModalState: boolean;
  UseCreateDealModal: (pipelineId?: string) => void;
  createDeal: (data: DealTypes) => Promise<void>;


  createDealContactModalState: boolean;
  UseCreateDealContactModal: (pipelineId?: string) => void;
  createDealContact: (data: DealTypes) => Promise<void>;

  dealDetailModalState: boolean;
  UseDealDetailModal: (deal: any) => void;

  setName: (name: string) => void;
  setDescription: (description: string)=>void;
  setFunnel: (funnel: string)=>void;
  getPipelines: () => void;
  pipelines: pipeline[];
  pipeline: pipeline;
  dealsList: any[];
  dealDetail: any;
  deals: any;
  selectedPipeline: string;
  setSelectedPipeline: any;
  dealTotalParams: any;
  onDragEnd: (any) => void;
  removefilterDeals: (boolean) => void;
  filterDeals: (value: string, type: string, resetFilter: boolean) => void;
  isLoading: boolean;
  hasError: string;
}

export interface pipeline {
  totalColumnValue: number;
  id: string;
  name: string;
  description: string;
  pipeBudgetSum: number;
  funnel_id: string;
  funnel?: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  deals?: any[];
}
