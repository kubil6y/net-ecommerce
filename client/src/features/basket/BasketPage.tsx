import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { currencyFormat } from "../../app/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { BasketSummary } from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export const BasketPage: FC = () => {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  if (!basket || (basket?.items && basket?.items.length === 0)) {
    return <Typography variant="h3">Your basket is empty</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    component={Link}
                    to={`/catalog/${item.productId}`}
                  >
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, width: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LoadingButton
                      color="error"
                      loading={
                        status === "pendingRemoveItem" + item.productId + "rem"
                      }
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "rem",
                          })
                        )
                      }
                    >
                      <RemoveIcon />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      color="secondary"
                      loading={status === "pendingAddItem" + item.productId}
                      onClick={() =>
                        dispatch(
                          addBasketItemAsync({
                            productId: item.productId,
                          })
                        )
                      }
                    >
                      <AddIcon />
                    </LoadingButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                  >
                    <DeleteIcon />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button component={Link} to="/checkout" variant="contained" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
