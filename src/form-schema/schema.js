import * as yup from "yup";

const schema = {
  login: yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  }),
  signup: yup.object().shape({
    email: yup.string().email().required("Email is required"),
    username: yup.string().required().min(4),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  }),
};

export default schema;
