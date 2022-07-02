export const getFieldInputClass = (value) => {
  return (
    "form-block__input" +
    (!value || value === "success" ? "" : " form-block__input--invalid")
  );
};

export const getInputFieldIconClass = (value) => {
  return !value
    ? ""
    : value === "success"
    ? "success-input-icon"
    : "invalid-input-icon";
};

export const getFeedback = (value) => {
  return value === "success" ? null : value;
};
