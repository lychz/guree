import React, {
  ReactNode,
  useState,
  FormEventHandler,
  useRef,
  ReactElement,
  useEffect,
} from "react";
import "./Form.scss";
import { scopedClass } from "@utils/index";
import FormContext from "./context";
import { validate, verify } from "./validator";

interface Form {
  [k: string]: unknown;
}

interface FormHook {
  form?: Form;
  setForm?: React.Dispatch<React.SetStateAction<Form>>;
}

interface Props {
  children: ReactElement;
  form: FormHook;
  onFinish: (form: Form | undefined) => {};
}

const Form: React.FunctionComponent<Props> = ({
  children,
  form,
  onFinish,
}: Props) => {
  const { form: $form = {}, setForm } = form;

  const errorForm = React.Children.map(children, (item) => {
    return {
      name: item.props.name,
      value: $form[item.props.name],
      validator: verify(item.props.rules, $form[item.props.name]),
    };
  }).filter((item) => {
    return item.name;
  });

  const errorForm2: { [k: string]: any } = React.Children.map(
    children,
    (item) => {
      return {
        name: item.props.name,
        value: $form[item.props.name],
        validator: verify(item.props.rules, $form[item.props.name]),
      };
    }
  ).reduce((previous, current) => {
    if (!current.name) {
      return previous;
    }
    return Object.assign(
      {},
      {
        [current.name]: "",
      },
      previous
    );
  }, {});

  const [$errorForm, setErrorForm] = useState(errorForm2);

  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    totalValidate(errorForm, setErrorForm);
  }, [$form]);

  const totalValidate = function (
    errorForm: {
      name: any;
      value: unknown;
      validator: Promise<string[] | undefined>;
    }[],
    setErrorForm: React.Dispatch<
      React.SetStateAction<{
        [k: string]: any;
      }>
    >
  ) {
    errorForm.forEach((item) => {
      // console.log(errorForm)
      item.validator.then((res: Array<string> | undefined) => {
        // console.log({
        //   [item.name]: res,
        // });
        console.log(11111111111111111);
        setErrorForm({
          [item.name]: res,
        });
      });
    });
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // console.log($form)
    // totalValidate($form)
    totalValidate(errorForm, setErrorForm);
    onFinish($form);
  };
  return (
    <FormContext.Provider value={{ ...form, errorForm: $errorForm }}>
      <form onSubmit={submitHandler}>{children}</form>
    </FormContext.Provider>
  );
};

export default Form;
