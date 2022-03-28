export interface IBasket {
  id: number;
  buyerId: string;
  items: IBasketItem[];
}

export interface IBasketItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}
