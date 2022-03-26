import axios from "axios";
import { FC, useEffect, useState } from "react";
import { IProduct } from "../../app/models";
import { ProductList } from "./ProductList";

interface ICatalogProps {}

export const Catalog: FC<ICatalogProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
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
