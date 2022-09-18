const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

// Route imports
const productRoutes = require("./Routes/productRoute");
const userRoutes = require("./Routes/userRoute");
const orderRoutes = require("./Routes/orderRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
//Middlewares
const errorMiddleWare = require("./Middleware/error");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json()); //????
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//Routes

app.use("/api/", productRoutes);
app.use("/api/", userRoutes);
app.use("/api/", orderRoutes);
app.use("/api/", paymentRoutes);
// Middleware for errors
app.use(errorMiddleWare);
module.exports = app;
