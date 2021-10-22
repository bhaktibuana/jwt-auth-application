export default function SignUpFormValidation(values) {
  let errors = {};
  let errorStats = false;

  if (!values.name.trim()) {
    errors.name = "Name is required";
    errorStats = true;
  }

  if (!values.email) {
    errors.email = "Email is required";
    errorStats = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email address is invalid";
    errorStats = true;
  }

  if (!values.password) {
    errors.password = "Password is required";
    errorStats = true;
  } else if (values.password.length < 8) {
    errors.password = "Password needs to be 8 characters or more";
    errorStats = true;
  }

  if (!values.passwordConf) {
    errors.passwordConf = "Password is required";
    errorStats = true;
  } else if (values.passwordConf !== values.password) {
    errors.passwordConf = "Passwords do not match";
    errorStats = true;
  }

  if (errorStats) {
    errors.stats = true;
  } else {
    errors.stats = false;
  }

  return errors;
}