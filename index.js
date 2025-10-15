import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
const PORT = 3000;
import router from "./routes/books.routes.js";

// Middlewares
app.use(express.json());
app.use("/books", router);

dotenv.config();

app.listen(PORT, () => {
  console.log(`App Listing on Port ${PORT}`);
});

const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) {
  console.error("No connection string provided in environment variables.");
  process.exit(1);
}
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
