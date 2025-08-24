export interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  mrp: number;
  rating: number;
  stock: number;
  category: ICategory | string;
  images: IImage[];
}

export interface IImage {
  _id: string;
  url: string;
  product_id: string;
  public_id: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export interface ICart {
  _id?: string;
  quantity: number;
  item: IProduct | string;
}

export interface IWishlist {
  _id?: string;
  item: IProduct | string;
}