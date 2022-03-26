import axios from "axios";
import { FC, useEffect, useState } from "react";
import { baseUrl } from "../../app/constants";
import { IProduct } from "../../app/models";
import { ProductList } from "./ProductList";

interface ICatalogProps {}

export const Catalog: FC<ICatalogProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get(`${baseUrl}/products`);
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    }

    getProducts();
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
