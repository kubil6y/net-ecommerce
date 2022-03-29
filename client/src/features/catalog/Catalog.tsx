import { FC, useEffect } from "react";
import { LoadingComponent } from "../../app/layout";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import { ProductList } from "./ProductList";

interface ICatalogProps {}

export const Catalog: FC<ICatalogProps> = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, productsLoaded]);

  if (status.includes("pending")) {
    return <LoadingComponent message="Loading products..." />;
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
