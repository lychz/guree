import { createContext, Context } from "react";

export interface formContextState {
  form?: any;
  setForm?: React.Dispatch<React.SetStateAction<any>>;
  errorForm?: any;
}

const FormContext: Context<formContextState> = createContext({});

export default FormContext;
