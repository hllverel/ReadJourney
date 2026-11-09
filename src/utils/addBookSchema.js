import * as yup from "yup";

export const addBookSchema = yup.object({
  title: yup.string().trim().required("Book title is required"),
  author: yup.string().trim().required("Author is required"),
  totalPages: yup
    .number()
    .typeError("Enter the number of pages")
    .integer("Pages must be a whole number")
    .min(1, "There must be at least 1 page")
    .required("Number of pages is required"),
});
