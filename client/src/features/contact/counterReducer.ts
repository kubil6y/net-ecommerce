export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 42,
  title: "YARC (yet another redux counter)",
};

export function counterReducer(
  state: CounterState = initialState,
  action: any
): CounterState {
  return state;
}
