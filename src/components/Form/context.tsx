import { createContext, Context } from "react";
import { UseFormFields } from "./fields";

export interface formContextState {
  formContext: {
    fields?: UseFormFields;
  };
}

const FormContext: Context<formContextState> = createContext({
  formContext: {},
});

export default FormContext;
