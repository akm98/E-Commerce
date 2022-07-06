const express = require("express");

// Route imports
const productRoutes = require("./Routes/productRoute");
const userRoutes = require("./Routes/userRoute");
//Middlewares
const errorMiddleWare = require("./Middleware/error");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json()); //????
app.use(cookieParser());
//Routes

app.use("/api/", productRoutes);
app.use("/api/", userRoutes);

// Middleware for errors
app.use(errorMiddleWare);
module.exports = app;
