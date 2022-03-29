import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { agent } from "../../app/api/agent";
import { IBasket } from "../../app/models";

interface IBasketState {
  basket: IBasket | null;
  status: string;
}

const initialState: IBasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
  IBasket,
  { productId: number; quantity?: number }
>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<
  void,
  {
    productId: number;
    quantity: number;
    name?: string /* name is for reducer */;
  }
>("basket/removeBasketItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await agent.Basket.removeItem(productId, quantity);
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<IBasket>) => {
      state.basket = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload); // TODO
      state.status = "idle";
    });

    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status =
        "pendingRemoveItem" +
          action.meta.arg.productId +
          action.meta.arg.name ?? "";
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );

      if (itemIndex === -1 || itemIndex === undefined) return;

      state.basket!.items[itemIndex].quantity -= quantity;

      if (state.basket?.items[itemIndex].quantity === 0) {
        state.basket.items.splice(itemIndex, 1);
      }
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action.payload); // TODO
      state.status = "idle";
    });
  },
});

export const { setBasket } = basketSlice.actions;
