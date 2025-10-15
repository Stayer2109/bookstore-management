import { body, validationResult, param } from "express-validator";

const createBookValidation = [
  body("bookName")
    .notEmpty()
    .withMessage("Book name is required")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "Book name must be at least 5 characters long and at most 100 characters long"
    ),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 1, max: 1000 })
    .withMessage("Price must be between 1$ and 1000$"),
  body("countInStock")
    .notEmpty()
    .withMessage("Count in stock is required")
    .isInt({ min: 1, max: 200 })
    .withMessage("Count in stock must be between 1 and 200"),
  body("image")
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Image must be a valid URL"),
];

const updateBookValidation = [
  body("bookName")
    .optional()
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "Book name must be at least 5 characters long and at most 100 characters long"
    ),
  body("price")
    .optional()
    .isFloat({ min: 1, max: 1000 })
    .withMessage("Price must be between 1$ and 1000$"),
  body("countInStock")
    .optional()
    .isInt({ min: 1, max: 200 })
    .withMessage("Count in stock must be between 1 and 200"),
  body("image").optional().isURL().withMessage("Image must be a valid URL"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const idValidation = [
  param("id").isMongoId().withMessage("Book ID must be valid MongoDB ObjectId"),
];

export {
  createBookValidation,
  updateBookValidation,
  handleValidationErrors,
  idValidation,
};
