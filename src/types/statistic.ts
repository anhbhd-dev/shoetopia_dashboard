export interface ItemsSaleReport {
  totalDocs: number;
  data: data[];
  totalPages: number;
}

export interface data {
  _id: string;
  totalSaleQuantity: number;
  salePriceAtBoughtTime: number;
  variationInfo: VariationInfo;
  productInfo: ProductInfo;
}

export interface ProductInfo {
  _id: string;
  name: string;
  description: string;
  isHot: boolean;
  avatar: string;
  images: string[];
  category: string;
  isActive: boolean;
  variations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VariationInfo {
  _id: string;
  size: string;
  unitPrice: number;
  salePrice: number;
  availableQuantity: number;
  createdAt: string;
  updatedAt: string;
}
