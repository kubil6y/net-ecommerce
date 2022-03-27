import { FC, useEffect, useState } from "react";
import { agent } from "../../app/api/agent";
import { IProduct } from "../../app/models";
import { ProductList } from "./ProductList";

interface ICatalogProps {}

export const Catalog: FC<ICatalogProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // TODO

  useEffect(() => {
    agent.Catalog.list()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ProductList products={products || []} />
    </>
  );
};
