import * as yup from "yup";

export const getReadingSchema = ({ totalPages, minPage = 1 }) =>
  yup.object({
    page: yup
      .number()
      .typeError("Enter a page number")
      .integer("Page must be a whole number")
      .min(minPage, `Page must be ${minPage} or higher`)
      .max(totalPages, `This book has only ${totalPages} pages`)
      .required("Page number is required"),
  });