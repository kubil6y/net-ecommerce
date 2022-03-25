import axios from "axios";
import { useEffect, useState } from "react";
import { Catalog } from "../../features";
import { IProduct } from "../models";

export function App() {
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

  function addProduct(): void {
    console.log("addProducts()");
  }

  return (
    <div>
      <Catalog products={products} addProduct={addProduct} />
    </div>
  );
}
