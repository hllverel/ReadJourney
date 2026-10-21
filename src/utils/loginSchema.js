import * as yup from "yup";

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(emailPattern, {
      message: "Enter a valid email",
      excludeEmptyString: true,
    })
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
});