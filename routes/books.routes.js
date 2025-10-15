import mongoose from "mongoose";
import express from "express";

const router = express.Router();

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
});

const BookModel = mongoose.model("Book", bookSchema);

router.post("/", async (req, res) => {
  try {
    const newBook = await BookModel.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("", async (req, res) => {
  try {
    const bookList = await BookModel.find();
    res.status(200).send(bookList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
