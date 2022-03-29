import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICounterState {
  data: number;
  title: string;
}

type IIncrement = number;
type IDecrement = number;

const initialState: ICounterState = {
  data: 42,
  title: "yarc (yet another redux counter)",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<IIncrement>) => {
      state.data += action.payload;
    },

    decrement: (state, action: PayloadAction<IDecrement>) => {
      state.data -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
