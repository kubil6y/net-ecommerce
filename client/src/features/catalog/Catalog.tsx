import { FC } from "react";
import { IProduct } from "../../app/models";

interface ICatalogProps {
  products: IProduct[];
  addProduct(): void;
}

export const Catalog: FC<ICatalogProps> = ({ products, addProduct }) => {
  return (
    <>
      {products.length > 0 &&
        products.map((product) => (
          <li key={product.id}>
            {product.brand} {product.name}
          </li>
        ))}
      <button onClick={addProduct}>Add product</button>
    </>
  );
};
