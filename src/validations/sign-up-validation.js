const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else {
    errors.email = "success";
  }

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

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (!/^[A-z]{2,30}$/i.test(values.firstName)) {
    errors.firstName = "First name should contain letters (length: 2-256)";
  } else {
    errors.firstName = "success";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (!/^[A-z]{2,30}$/i.test(values.lastName)) {
    errors.lastName = "Last name should contain letters (length: 2-256)";
  } else {
    errors.lastName = "success";
  }

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
