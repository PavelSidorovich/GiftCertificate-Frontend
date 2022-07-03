function validateProduct(values, isUpdate) {
  const errors = {};

  if (!isUpdate && !values.name) {
    errors.name = "Required";
  } else if (!/^[-A-z ]{2,256}$/i.test(values.name)) {
    errors.name = "Invalid name";
  } else {
    errors.name = "success";
  }

  if (!values.price) {
    errors.price = "Required";
  } else if (!/^[1-9][\d]*([.][\d]{0,2})?$/i.test(values.price)) {
    errors.price = "Invalid price";
  } else {
    errors.price = "success";
  }

  if (!values.duration) {
    errors.duration = "Required";
  } else if (!/^[1-9][\d]{0,2}$/i.test(values.duration)) {
    errors.duration = "Invalid duration";
  } else {
    errors.duration = "success";
  }

  if (!isUpdate && values.tags.length === 0) {
    errors.tags = "Add tags";
  } else {
    errors.tags = "success";
  }

  if (
    !isUpdate &&
    values.image &&
    !values.image.includes("image/jpeg") &&
    !values.image.includes("image/png") &&
    !values.image.includes("no-thumbnail")
  ) {
    errors.image = "Invalid image (.png, .jpeg, .jpg)";
  } else {
    errors.image = "success";
  }

  if (
    errors.name === "success" &&
    errors.price === "success" &&
    errors.duration === "success" &&
    errors.tags === "success" &&
    errors.image === "success"
  ) {
    return {};
  }

  return errors;
}

export default validateProduct;
