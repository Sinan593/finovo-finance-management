// Express libraries
const express = require("express");
const app = express();

// Libraries used for reading .env files
require("dotenv").config();

// Router Imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const invoiceItemsRoutes = require("./routes/invoiceItemsRoutes");

// Utility libraries
const logger = require("./utils/logger");

// Middlewares
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Custom Middlewares
const errorHandler = require("./middlewares/errorHandler");
const { NotFoundResponse } = require("./middlewares/404Response");

// Database libraries
const { connectDB, connection } = require("./db/connectDB");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/invoice_items", invoiceItemsRoutes);

app.use(NotFoundResponse);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  logger.info(`Server listening at port ${PORT}`);
});
