import { FC, useState } from "react";
import { currencyFormat } from "../../app/utils";
import { useStoreContext } from "../../app/context";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { agent } from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
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
import { BasketSummary } from "./BasketSummary";
import { Link } from "react-router-dom";

export const BasketPage: FC = () => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({ name: "", loading: false });

  if (!basket || (basket?.items && basket?.items.length === 0)) {
    return <Typography variant="h3">Your basket is empty</Typography>;
  }

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ name: "", loading: false }));
  }

  function handleRemoveItem(productId: number, quantity: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ name: "", loading: false }));
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
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
                        "remove:" + item.productId === status.name &&
                        status.loading
                          ? true
                          : false
                      }
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          1,
                          "remove:" + item.productId
                        )
                      }
                    >
                      <RemoveIcon />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      color="secondary"
                      loading={
                        "add:" + item.productId === status.name &&
                        status.loading
                          ? true
                          : false
                      }
                      onClick={() =>
                        handleAddItem(item.productId, "add:" + item.productId)
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
                    loading={
                      "delete:" + item.productId === status.name &&
                      status.loading
                        ? true
                        : false
                    }
                    color="error"
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        "delete:" + item.productId
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
