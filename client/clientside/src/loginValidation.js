import validator from 'validator';

function Validation(values) {
  let error = {};

  if (validator.isEmpty(values.email)) {
    error.email = "Email should not be empty";
  } else if (!validator.isEmail(values.email)) {
    error.email = "Invalid email address";
  } else {
    error.email = "";
  }

  if (validator.isEmpty(values.password)) {
    error.password = "Password should not be empty";
  } else if (!validator.isStrongPassword(values.password, { minSymbols: 1 })) {
    error.password = "Invalid password";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;