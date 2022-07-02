const validatePassword = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 30) {
    errors.password = "Password should be at least 8 symbols (up to 30)";
  } else {
    errors.password = "success";
  }

  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = "Passwords are not equal";
  } else {
    errors.passwordConfirm = "success";
  }

  return errors;
};

export default validatePassword;
