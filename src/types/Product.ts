export interface IProduct {
  id?: string;
  name?: string;
  value?: any;
  description?: string;
}


export interface IProductContext{
  useDeleteProductModal:()=>void;
  deleteProductModal:boolean;
}