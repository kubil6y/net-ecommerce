import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../errors";
import { LoadingComponent } from "../../app/layout";
import { currencyFormat } from "../../app/utils";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

interface IParams {
  id: string;
}

export const ProductDetails: FC = () => {
  const { id } = useParams<IParams>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id)
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const { basket, status: basketStatus } = useAppSelector(
    (state) => state.basket
  );

  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find((item) => item.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  function handleInputChange(event: any) {
    const value = parseInt(event.target.value);
    if (value >= 0) {
      setQuantity(value);
    }
  }

  function handleUpdateCart() {
    // check if we have an item
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      // removing the item
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus.includes("pending")) {
    return <LoadingComponent message="Loading product details..." />;
  }

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyFormat(product.price)}
        </Typography>

        <TableContainer sx={{ marginLeft: "-12px" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Quantity in Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              label="Quantity in Cart"
              value={quantity}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={basketStatus.includes("pending")}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
