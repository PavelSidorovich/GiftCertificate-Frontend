import validatePassword from "./password-validation";
import validatePersonalInfo from "./personal-info-validation";

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else {
    errors.email = "success";
  }

  const passwordErrors = validatePassword(values);
  errors = { ...errors, ...passwordErrors };

  const personalInfoErrors = validatePersonalInfo(values);
  errors = { ...errors, ...personalInfoErrors };

  if (
    errors.email === "success" &&
    errors.password === "success" &&
    errors.passwordConfirm === "success" &&
    errors.firstName === "success" &&
    errors.lastName === "success"
  ) {
    return {};
  }

  return errors;
};

export default validate;
