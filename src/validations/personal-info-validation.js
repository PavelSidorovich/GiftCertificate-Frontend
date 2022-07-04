const validatePersonalInfo = (values) => {
  const errors = {};

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

  return errors;
};

export default validatePersonalInfo;
