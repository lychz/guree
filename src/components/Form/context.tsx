import { createContext, Context } from "react";
import { UseForm } from "./field";
export interface formContextState {
  formContext: {
    fields?: UseForm;
  };
}

const FormContext: Context<formContextState> = createContext({
  formContext: {},
});

export default FormContext;
