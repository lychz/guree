interface SyncRule {
  required: boolean;
}

export interface Rule extends SyncRule {
  message?: string;
  validator?: (rule: Rule, value: unknown) => Promise<unknown>;
}

export type Rules = Array<Rule>;

export type ValidateResult = {
  status: boolean;
  msg: string;
};

export type ValidateFunction = (value: unknown, rule: Rule) => ValidateResult;

const getValidateResult = (status: boolean, msg: string) => ({
  status,
  msg,
});

const validateRequired: ValidateFunction = (value, rule) => {
  const { required, message } = rule;
  const defaultMsg = "required";
  if (required && (value === undefined || value === null || value === "")) {
    return {
      status: false,
      msg: message || defaultMsg,
    };
  }
  return {
    status: true,
    msg: "",
  };
};

const syncValidatorsMap = {
  required: validateRequired,
};

const getTotalSyncValidators: (
  syncRule: SyncRule
) => Array<[boolean | undefined, ValidateFunction]> = (syncRule: SyncRule) => {
  const { required } = syncRule;
  return [[required, syncValidatorsMap["required"]]];
};

const validate = (rules: Rules, value: unknown) => {
  return rules
    .map((rule) => {
      const { required, validator } = rule;

      const totalSyncValidators = getTotalSyncValidators({
        required,
      });
      const syncValidators = totalSyncValidators
        .filter((x) => x[0])
        .map((x) => x[1]);
      const syncValidatorsResult = syncValidators.map((syncValidator) => {
        return new Promise((resolve: (result: ValidateResult) => void) => {
          const { status, msg } = syncValidator(value, rule);
          resolve(getValidateResult(status, status ? "" : msg));
        });
      });
      const asyncValidatorsResult = validator
        ? [
            new Promise(async (resolve: (result: ValidateResult) => void) => {
              try {
                await validator(rule, value);
                resolve(getValidateResult(true, ""));
              } catch (error) {
                resolve(getValidateResult(false, error || ""));
              }
            }),
          ]
        : [];
      return syncValidatorsResult.concat(asyncValidatorsResult);
    })
    .flat();
};

const verify = async (rules: Rules, value: unknown) => {
  if (!rules) {
    return;
  }
  const result = await Promise.all(validate(rules, value))
  const errorMsgs = result.filter((x: ValidateResult) => !x.status).map(x => x.msg)
  return errorMsgs
};

export { validate, verify };
