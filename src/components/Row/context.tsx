import { createContext, Context } from "react";

export interface RowContextState {
  horizontal?: number;
  vertical?: number;
}

const RowContext: Context<RowContextState> = createContext({});

export default RowContext;
