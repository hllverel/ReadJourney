import * as yup from "yup";

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(emailPattern, {
      message: "Enter a valid Email",
      excludeEmptyString: true,
    })
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Enter a valid Password*")
    .required("Password is required"),
});