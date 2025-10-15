import dotenv from "dotenv";
import express from "express";
import i18next from "i18next";
import backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import router from "./routes/books.routes.js";
const app = express();
const PORT = 3000;

// Setup Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0", // Swagger version
  info: {
    title: "Books API", // API title
    version: "1.0.0", // API version
    description: "A simple Express Books API.", // API description
  },
  servers: [
    {
      url: "http://localhost:3000", // API server URL
    },
  ],
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Specify the files where Swagger annotations are defined
};

// Create swagger specs
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares
i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "locales/{{lng}}.json",
    },
  });

app.use(middleware.handle(i18next));
app.use(express.json());
app.use("/books", router);

dotenv.config();

app.listen(PORT, () => {
  console.log(`App Listing on Port ${PORT}`);

  console.log(
    "Swagger documentation is available at http://localhost:3000/api-docs"
  );
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
