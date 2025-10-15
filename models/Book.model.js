import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Book name is required"],
    minlength: [5, "Book name must be at least 5 characters"],
    maxlength: [100, "Book name must be at most 100 characters"],
  },
  countInStock: {
    type: Number,
    required: [true, "Count in stock is required"],
    min: [1, "Count in stock must be at least 1"],
    max: [1000, "Count in stock must be at most 1000"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be at least 1"],
    max: [10000, "Price must be at most 10000"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "",
    validate: {
      validator: function (v) {
        if (!v) return true;

        return /^https?:\/\/.+/.test(v);
      },
      message: "Image URL must be a valid URL",
    },
  },
});

bookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookSchema.set("toJSON", {
  virtuals: true,
});

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
