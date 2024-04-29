import { Variation } from "./variation.type";

export type ProductFormType = {
  name?: string;
  description?: string;
  isHot?: boolean;
  isActive?: boolean;
  categoryId?: string;
  avatar?: string;
  images?: string[];
};

export type Image = string[];

export type Category = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  isHot: boolean;
  avatar: string;
  images: Image;
  category: Category;
  isActive: boolean;
  variations: Variation[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
