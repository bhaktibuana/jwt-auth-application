export default function SignInFormValidation(values) {
  let errors = {};
  let errorStats = false;

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
  }

  if (errorStats) {
    errors.stats = true;
  } else {
    errors.stats = false;
  }

  return errors;
}