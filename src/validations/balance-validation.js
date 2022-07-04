const validateBalance = (values) => {
  const errors = {};

  if (!values.balance) {
    errors.balance = "Required";
  } else if (
    !/^[1-9][\d]*([.][\d]{0,2})?$/i.test(values.balance) ||
    values.balance > 10000
  ) {
    errors.balance = "Invalid money amount";
  } else {
    errors.balance = "success";
  }

  return errors;
};

export default validateBalance;
